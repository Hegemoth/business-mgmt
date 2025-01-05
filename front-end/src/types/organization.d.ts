import { PredefinedShift } from './employees';
import { uuid } from './shared';

interface Organization {
  id: uuid;
  name: string;
  features: string[];
  config: OrgConfig;
}

interface OrgConfig {
  predefinedShifts?: PredefinedShift[];
}

interface OrgMember {
  id: uuid;
  firstName: string;
  lastName: string;
  userId: uuid;
  orgId: uuid;
  role: string;
  active: boolean;
}
