import { AppRoute } from './enums';

export type NavConfig = NavCategory[];

export interface NavCategory {
  category: string;
  items: NavItem[];
}

export interface NavItem {
  title: string | JSX.Element;
  icon?: JSX.Element;
  path?: AppRoute;
  navNestedItems?: NavNestedItem[];
}

export interface NavNestedItem {
  title: string | JSX.Element;
  path: AppRoute;
}
