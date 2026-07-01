import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'

const staffPerformanceFilterValidator = vine.compile(
  vine.object({
    from: vine.string().optional(),
    to: vine.string().optional(),
  })
)

export default class StaffController {
  async performance({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const filters = await request.validateUsing(staffPerformanceFilterValidator)

    const bindings: any[] = [user.businessId]
    let dateFilter = ''

    if (filters.from) {
      dateFilter += ' AND s.created_at >= ?'
      bindings.push(filters.from)
    }
    if (filters.to) {
      dateFilter += ' AND s.created_at <= ?'
      bindings.push(filters.to)
    }

    const rows = await db.rawQuery(
      `
      SELECT
        u.id                                         AS "staffId",
        u.full_name                                  AS "fullName",
        COUNT(si.id)::int                            AS "totalServices",
        COALESCE(SUM(si.total), 0)::float            AS "totalRevenue",
        json_agg(
          json_build_object('name', si.product_name, 'total', si.total)
          ORDER BY si.total DESC
        ) FILTER (WHERE si.id IS NOT NULL)           AS "servicesRaw"
      FROM users u
      LEFT JOIN sale_items si
        ON si.assigned_staff_id = u.id
      LEFT JOIN sales s
        ON s.id = si.sale_id
        AND s.status = 'completed'
        AND s.business_id = ?
        ${dateFilter}
      WHERE u.business_id = ?
        AND u.is_active = true
      GROUP BY u.id, u.full_name
      ORDER BY "totalRevenue" DESC
      `,
      [...bindings, user.businessId]
    )

    const staff = rows.rows.map((row: any) => {
      const allServices: Array<{ name: string; total: number }> = row.servicesRaw ?? []

      // Aggregate top 3 services by revenue
      const serviceMap: Record<string, { name: string; count: number; revenue: number }> = {}
      for (const s of allServices) {
        if (!serviceMap[s.name]) serviceMap[s.name] = { name: s.name, count: 0, revenue: 0 }
        serviceMap[s.name].count++
        serviceMap[s.name].revenue += s.total
      }
      const topServices = Object.values(serviceMap)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 3)
        .map(({ name, count, revenue }) => ({ name, count, revenue }))

      return {
        staffId: row.staffId,
        fullName: row.fullName,
        totalServices: row.totalServices,
        totalRevenue: row.totalRevenue,
        topServices,
      }
    })

    return response.ok({ data: staff })
  }
}
