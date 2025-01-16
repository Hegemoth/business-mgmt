import { uuid } from './shared';

interface Organization {
  id: uuid;
  name: string;
  package: 'premium' | 'demo';
  features: OrgFeatures;
  config: OrgConfig;
}

interface OrgFeatures {
  filtering: boolean;
  materialsLimit: boolean;
  productsLimit: boolean;
}

interface OrgConfig {
  sidenav: 'left' | 'right';
}
