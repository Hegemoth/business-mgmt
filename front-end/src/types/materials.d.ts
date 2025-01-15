import { Unit } from './enums';
import { Product } from './products';
import { OnlyData, uuid } from './shared';

interface Material {
  id: uuid;
  orgId: uuid;
  name: string;
  amount: number;
  unit: Unit;
  netCost: number;
  taxRate: number;
  grossCost: number;
  active: boolean;
}

type NestedMaterial = Pick<Material, 'id' | 'name' | 'unit'>;

type MaterialData = OnlyData<Material>;

interface MaterialPurchase {
  id: uuid;
  orgId: uuid;
  date: string;
  items: MaterialPurchaseItem[];
}

interface MaterialPurchaseItem {
  amount: number;
  material: NestedMaterial;
}

type MaterialPurchaseData = OnlyData<MaterialPurchase>;
