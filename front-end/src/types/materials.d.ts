import { Unit } from './enums';
import { uuid } from './shared';

interface Material {
  id: uuid;
  orgId: uuid;
  name: string;
  unit: Unit;
  netCost: number;
  taxRate: number;
  grossCost: number;
  active: boolean;
}

type MaterialData = Omit<Material, 'id' | 'orgId'>;
