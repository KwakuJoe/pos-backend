import type { ApplicationService } from '@adonisjs/core/types'

export default class TransmitRoutesProvider {
  constructor(protected app: ApplicationService) {}

  async boot() {
    const transmit = await this.app.container.make('transmit')
    transmit.registerRoutes()
  }
}
