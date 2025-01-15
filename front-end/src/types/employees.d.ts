import { EmploymentType, PaymentPeriod } from './enums';
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

type EmployeeData = Omit<Employee, 'id' | 'orgId'>;

interface EmployeePosition {
  id: uuid;
  orgId: uuid;
  name: string;
  color: string;
}

type EmployeePositionData = Omit<EmployeePosition, 'id' | 'orgId'>;

interface EmployeeAssignment {
  id: uuid;
  orgId: uuid;
  employeeId: uuid;
  positionId: uuid;
  rate: number;
  paymentPeriod: PaymentPeriod;
  employmentType: EmploymentType;
  empStart: DateType;
  empEnd?: DateType;
}

type EmployeeAssignmentData = Omit<EmployeeAssignment, 'id' | 'orgId'>;

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
