import { DateType, uuid } from './shared';

interface Employee {
  id: uuid;
  orgId: uuid;
  firstName: string;
  lastName: string;
  active: boolean;
  email?: string;
  phone?: string;
}

type EmployeeData = Pick<
  Employee,
  'firstName' | 'lastName' | 'email' | 'phone'
>;

type EmployeePayload = EmployeeData & { active?: boolean };

interface EmployeePosition {
  id: uuid;
  orgId: uuid;
  name: string;
  color: string;
}

type EmployeePositionData = Pick<EmployeePosition, 'name' | 'color'>;

interface EmployeeShift {
  id: uuid;
  employeeId: uuid;
  positionId: uuid;
  orgId: uuid;
  shiftDate: DateType;
  shiftStart: DateType;
  shiftEnd: DateType;
}

interface PredefinedShift {
  start: string;
  end: string;
}
