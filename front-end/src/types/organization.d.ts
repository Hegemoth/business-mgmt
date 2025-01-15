import { PredefinedShift } from './employees';
import { uuid } from './shared';

interface Organization {
  id: uuid;
  name: string;
  package: 'premium' | 'demo';
  features: OrgFeatures;
}

interface OrgFeatures {
  filtering: boolean;
  materialsLimit: boolean;
  productsLimit: boolean;
}
