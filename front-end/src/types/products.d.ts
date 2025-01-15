import { uuid } from './shared';

interface Product {
  id: uuid;
  orgId: uuid;
  name: string;
  unit: Unit;
  netCost: number;
  taxRate: number;
  grossCost: number;
  active: boolean;
}

type ProductData = Omit<Product, 'id' | 'orgId'>;
