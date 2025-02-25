import Icon from '../../../components/Icon';
import { AppRoute } from '../../../types/enums';
import { NavConfig } from '../../../types/navigation';

const SideNavConfig = (): NavConfig => {
  return [
    {
      category: 'main',
      items: [
        {
          title: 'Dashboard',
          icon: <Icon.Home />,
          path: AppRoute.HOME,
        },
        {
          title: 'Pracownicy',
          icon: <Icon.Employees />,
          navNestedItems: [
            {
              title: 'Pracownicy',
              path: AppRoute.EMPLOYEES,
            },
            {
              title: 'Stanowiska',
              path: AppRoute.EMPLOYEE_POSITIONS,
            },
            // {
            //   title: 'Rejestr czasu pracy',
            //   path: AppRoute.EMPLOYEE_SHIFTS,
            // },
          ],
        },
        {
          title: 'Materiały',
          icon: <Icon.Materials />,
          navNestedItems: [
            {
              title: 'Lista materiałów',
              path: AppRoute.MATERIALS,
            },
            {
              title: 'Kupno materiałów',
              path: AppRoute.MATERIAL_PURCHASE,
            },
          ],
        },
        {
          title: 'Produkty',
          icon: <Icon.Products />,
          navNestedItems: [
            {
              title: 'Lista produktów',
              path: AppRoute.PRODUCTS,
            },
            {
              title: 'Sprzedaż produktów',
              path: AppRoute.PRODUCT_SALES,
            },
          ],
        },
        // {
        //   title: 'Pozostałe faktury',
        //   icon: <Icon.Invoices />,
        //   path: AppRoute.INVOICES,
        // },

        // ---------- TODO: Think through how to do it right. Maybe charts on the dashboard? ----------

        // {
        //   title: 'Raporty miesięczne',
        //   icon: <Icon.Reports />,
        //   navNestedItems: [
        //     {
        //       title: 'Raport przychodów',
        //       path: AppRoute.REPORT_REVENUES,
        //     },
        //     {
        //       title: 'Raport sprzedaży',
        //       path: AppRoute.REPORT_SALES,
        //     },
        //     {
        //       title: 'Raport kosztów',
        //       path: AppRoute.REPORT_COSTS,
        //     },
        //     {
        //       title: 'Raport zużycia materiałów',
        //       path: AppRoute.REPORT_MATERIAL_USAGE,
        //     },
        //   ],
        // },

        // ---------- TODO: Future managing of users, roles and org settings + app settings ----------

        // {
        //   title: 'Użytkownicy',
        //   icon: <Icon.Users />,
        //   navNestedItems: [
        //     {
        //       title: 'Użytkownicy',
        //       path: AppRoute.USERS,
        //     },
        //     {
        //       title: 'Uprawnienia użytkowników',
        //       path: AppRoute.USER_PERMISSIONS,
        //     },
        //   ],
        // },
        {
          title: 'Ustawienia',
          icon: <Icon.Settings />,
          path: AppRoute.SETTINGS,
        },
      ],
    },

    // ---------- TODO: Future categories ----------

    {
      category: 'admin',
      items: [
        {
          title: 'Admin',
          icon: <Icon.Admin />,
          navNestedItems: [
            {
              title: 'Funkcjonalności',
              path: AppRoute.ADMIN_FEATURES,
            },
            // {
            //   title: 'Organizacje',
            //   path: AppRoute.ADMIN_ORGANIZATIONS,
            // },
            // {
            //   title: 'Użytkownicy',
            //   path: AppRoute.ADMIN_USERS,
            // },
            // {
            //   title: 'Uprawnienia użytkowników',
            //   path: AppRoute.ADMIN_USER_PERMISSIONS,
            // },
          ],
        },
      ],
    },
    // {
    //   category: 'global',
    //   items: [
    //     {
    //       title: 'Global',
    //       icon: <Icon.Global />,
    //     },
    //   ],
    // },
  ];
};

export default SideNavConfig;
