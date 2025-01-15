import { OnlyData, uuid } from './shared';

interface Product {
  id: uuid;
  orgId: uuid;
  name: string;
  netCost: number;
  taxRate: number;
  grossCost: number;
  active: boolean;
}

type ProductData = OnlyData<Product>;
