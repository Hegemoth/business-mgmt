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
  CREATE,
  CHANGE,
}
