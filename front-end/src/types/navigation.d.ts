import { AppRoute } from './enums';

type NavConfig = NavCategory[];

interface NavCategory {
  category: string;
  items: NavItem[];
}

interface NavItem {
  title: string | JSX.Element;
  icon?: JSX.Element;
  path?: AppRoute;
  navNestedItems?: NavNestedItem[];
}

interface NavNestedItem {
  title: string | JSX.Element;
  path: AppRoute;
}
