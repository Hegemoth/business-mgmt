import { Currency, InvoiceType, PaymentMethod, TaxRate } from './enums';
import { DateType, uuid } from './shared';

interface Invoice {
  id: uuid;
  name: string;
  orgId: uuid;
  type: InvoiceType;
  issueDate: DateType;
  salesDate: DateType;
  dueDate: DateType;
  paymentDate: DateType;
  paymentMethod: PaymentMethod;
  paymentTerm: string;
  currency: Currency;
  netTotal: number;
  grossTotal: number;
  taxTotal: TaxRate;
  items: InvoiceItem[];
  notes: string;
  status: string;
}

interface InvoiceItem {
  id: uuid;
  invoiceId: uuid;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  netTotal: number;
  taxRate: TaxRate;
  taxTotal: number;
  grossTotal: number;
}
