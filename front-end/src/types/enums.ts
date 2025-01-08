export type Export = string;

export enum AppRoute {
  HOME = '/',
  EMPLOYEES = '/employees',
  EMPLOYEE_POSITIONS = '/employee-positions',
  EMPLOYEE_SHIFTS = '/employee-shifts',
  MATERIALS = '/materials',
  MATERIAL_PURCHASE = '/materials/purchase',
  PRODUCTS = '/products',
  PRODUCT_SALES = '/products/sales',
  INVOICES = '/invoices',
  REPORT_REVENUES = '/report/revenues',
  REPORT_SALES = '/report/sales',
  REPORT_COSTS = '/report/costs',
  REPORT_MATERIAL_USAGE = '/report/material-usage',
  USERS = '/users',
  USER_PERMISSIONS = '/user-permissions',
  SETTINGS = '/settings',
  ADMIN_FEATURES = '/admin/features',
  ADMIN_ORGANIZATIONS = '/admin/organizations',
  ADMIN_USERS = '/admin/users',
  ADMIN_USER_PERMISSIONS = '/admin/user-permissions',
}

export enum ModalMode {
  CLOSED,
  ADD,
  EDIT,
  DELETE,
}

export enum EmploymentType {
  UOP = 'UOP',
  B2B = 'B2B',
  UZ = 'UZ',
  UOD = 'UOD',
}

export enum PaymentPeriod {
  MONTHLY = 'monthly',
  HOURLY = 'hourly',
}

export enum Unit {
  UN = 'un',
  KG = 'kg',
  L = 'l',
}

export enum TaxRate {
  _23 = 23,
  _8 = 8,
  _5 = 5,
  _0 = 0,
}

export enum InvoiceType {
  PURCHASE = 'purchase',
  SALE = 'sale',
}

export enum PaymentMethod {
  CARD = 'card',
  CASH = 'cash',
  TRANSFER = 'transfer',
}

export enum Currency {
  PLN = 'PLN',
  EUR = 'EUR',
  USD = 'USD',
}

export enum TableId {
  EMPLOYEES = 'employees',
  EMPLOYEE_POSITIONS = 'employee_positions',
}
