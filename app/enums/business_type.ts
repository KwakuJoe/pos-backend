export enum BusinessType {
  Retail = 'retail',
  Supermarket = 'supermarket',
  Restaurant = 'restaurant',
  Cafe = 'cafe',
  Pharmacy = 'pharmacy',
  Laundry = 'laundry',
  Salon = 'salon',
  Electronics = 'electronics',
  Clothing = 'clothing',
  Other = 'other',
}

export const BUSINESS_TYPE_LABELS: Record<BusinessType, string> = {
  [BusinessType.Retail]: 'Retail',
  [BusinessType.Supermarket]: 'Supermarket',
  [BusinessType.Restaurant]: 'Restaurant',
  [BusinessType.Cafe]: 'Café / Coffee Shop',
  [BusinessType.Pharmacy]: 'Pharmacy',
  [BusinessType.Laundry]: 'Laundry',
  [BusinessType.Salon]: 'Salon / Barbershop',
  [BusinessType.Electronics]: 'Electronics',
  [BusinessType.Clothing]: 'Clothing / Fashion',
  [BusinessType.Other]: 'Other',
}
