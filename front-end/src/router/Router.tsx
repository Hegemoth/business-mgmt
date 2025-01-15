import { Route, Routes } from 'react-router-dom';
import AdminFeatures from '../pages/AdminFeatures/AdminFeatures';
import AdminOrganizations from '../pages/AdminOrganizations/AdminOrganizations';
import AdminUserPermissions from '../pages/AdminUserPermissions/AdminUserPermissions';
import AdminUsers from '../pages/AdminUsers/AdminUsers';
import EmployeePositions from '../pages/EmployeePositions/EmployeePositions';
import Employees from '../pages/Employees/Employees';
import EmployeeShifts from '../pages/EmployeeShifts/EmployeeShifts';
import Home from '../pages/Home/Home';
import Invoices from '../pages/Invoices/Invoices';
import MaterialPurchases from '../pages/MaterialPurchases/MaterialPurchases';
import Materials from '../pages/Materials/Materials';
import Products from '../pages/Products/Products';
import ProductSales from '../pages/ProductSales/ProductSales';
import ReportCosts from '../pages/ReportCosts/ReportCosts';
import ReportMaterialUsage from '../pages/ReportMaterialUsage/ReportMaterialUsage';
import ReportRevenues from '../pages/ReportRevenues/ReportRevenues';
import ReportSales from '../pages/ReportSales/ReportSales';
import Settings from '../pages/Settings/Settings';
import UserPermissions from '../pages/UserPermissions/UserPermissions';
import Users from '../pages/Users/Users';
import { AppRoute } from '../types/enums';

const Router = () => (
  <Routes>
    <Route path={AppRoute.HOME} element={<Home />} />
    <Route path={AppRoute.EMPLOYEES} element={<Employees />} />
    <Route path={AppRoute.EMPLOYEE_POSITIONS} element={<EmployeePositions />} />
    <Route path={AppRoute.EMPLOYEE_SHIFTS} element={<EmployeeShifts />} />
    <Route path={AppRoute.MATERIALS} element={<Materials />} />
    <Route path={AppRoute.MATERIAL_PURCHASE} element={<MaterialPurchases />} />
    <Route path={AppRoute.PRODUCTS} element={<Products />} />
    <Route path={AppRoute.PRODUCT_SALES} element={<ProductSales />} />
    <Route path={AppRoute.EMPLOYEE_SHIFTS} element={<EmployeeShifts />} />
    <Route path={AppRoute.INVOICES} element={<Invoices />} />
    <Route path={AppRoute.REPORT_REVENUES} element={<ReportRevenues />} />
    <Route path={AppRoute.REPORT_SALES} element={<ReportSales />} />
    <Route path={AppRoute.REPORT_COSTS} element={<ReportCosts />} />
    <Route path={AppRoute.REPORT_MATERIAL_USAGE} element={<ReportMaterialUsage />} />
    <Route path={AppRoute.USERS} element={<Users />} />
    <Route path={AppRoute.USER_PERMISSIONS} element={<UserPermissions />} />
    <Route path={AppRoute.SETTINGS} element={<Settings />} />
    <Route path={AppRoute.ADMIN_FEATURES} element={<AdminFeatures />} />
    <Route path={AppRoute.ADMIN_ORGANIZATIONS} element={<AdminOrganizations />} />
    <Route path={AppRoute.ADMIN_USERS} element={<AdminUsers />} />
    <Route path={AppRoute.ADMIN_USER_PERMISSIONS} element={<AdminUserPermissions />} />
  </Routes>
);

export default Router;
