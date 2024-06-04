export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home'
      }
    ]
  },
  {
    id: 'ui-component',
    title: 'Ui Component',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'basic',
        title: 'Component',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'button',
            title: 'Button',
            type: 'item',
            url: '/component/button'
          },
          {
            id: 'badges',
            title: 'Badges',
            type: 'item',
            url: '/component/badges'
          },
          {
            id: 'breadcrumb-pagination',
            title: 'Breadcrumb & Pagination',
            type: 'item',
            url: '/component/breadcrumb-paging'
          },
          {
            id: 'collapse',
            title: 'Collapse',
            type: 'item',
            url: '/component/collapse'
          },
          {
            id: 'tabs-pills',
            title: 'Tabs & Pills',
            type: 'item',
            url: '/component/tabs-pills'
          },
          {
            id: 'typography',
            title: 'Typography',
            type: 'item',
            url: '/component/typography'
          }
        ]
      }
    ]
  },

  {
    id: 'commandes',
    title: 'Commandes',
    type: 'group',
    icon: 'icon-layers',
    children: [
      {
        id: 'commandes',
        title: 'Commande Client',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'commandes',
            title: 'Liste des Commandes',
            type: 'item',
            url: '/get-orders'
          },
          {
            id: 'commandes',
            title: 'Ajouter Commande',
            type: 'item',
            url: '/add-order'
          },
        ]
      }
    ]
  },
  {
    id: 'stockMovements',
    title: 'Mouvement Stock',
    type: 'group',
    icon: 'icon-layers',
    children: [
      {
        id: 'stockMovements',
        title: 'Mouvement Stock',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'stockMovements',
            title: 'Liste des Mouvements De Stock',
            type: 'item',
            url: '/stock-movements'
          },
        ]
      }
    ]
  },
  {
    id: 'gestionStock',
    title: 'Gestion Stock',
    type: 'group',
    icon: 'icon-layers',
    children: [
      {
        id: 'gestionStock',
        title: 'Gestion Stock',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'categories',
            title: 'Categories',
            type: 'item',
            url: '/categories'
          },
          {
            id: 'sousCategories',
            title: 'Sous Categories',
            type: 'item',
            url: '/sousCategories'
          },
          {
            id: 'articles',
            title: 'Articles',
            type: 'item',
            url: '/articles'
          },
          {
            id: 'ajouter-article',
            title: 'Ajouter Article',
            type: 'item',
            url: '/ajouterArticle'
          }
        ]
      }
    ]
  },
  {
    id: 'clients',
    title: 'Personnel',
    type: 'group',
    icon: 'icon-layers',
    children: [
      {
        id: 'clients',
        title: 'Clients',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'clients',
            title: 'Clients',
            type: 'item',
            url: '/clients'
          }
        ]
      }
    ]
  },
  {
    id: 'Authentication',
    title: 'Authentication',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'signup',
        title: 'Sign up',
        type: 'item',
        url: '/auth/signup',
        icon: 'feather icon-at-sign',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'signin',
        title: 'Sign in',
        type: 'item',
        url: '/auth/signin',
        icon: 'feather icon-log-in',
        target: true,
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'chart',
    title: 'Chart',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'apexchart',
        title: 'ApexChart',
        type: 'item',
        url: '/chart',
        classes: 'nav-item',
        icon: 'feather icon-pie-chart'
      }
    ]
  },
  {
    id: 'forms & tables',
    title: 'Forms & Tables',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'forms',
        title: 'Basic Forms',
        type: 'item',
        url: '/forms',
        classes: 'nav-item',
        icon: 'feather icon-file-text'
      },
      {
        id: 'tables',
        title: 'tables',
        type: 'item',
        url: '/tables',
        classes: 'nav-item',
        icon: 'feather icon-server'
      }
    ]
  },
  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'menu-level',
        title: 'Menu Levels',
        type: 'collapse',
        icon: 'feather icon-menu',
        children: [
          {
            id: 'menu-level-2.1',
            title: 'Menu Level 2.1',
            type: 'item',
            url: 'javascript:',
            external: true
          },
          {
            id: 'menu-level-2.2',
            title: 'Menu Level 2.2',
            type: 'collapse',
            children: [
              {
                id: 'menu-level-2.2.1',
                title: 'Menu Level 2.2.1',
                type: 'item',
                url: 'javascript:',
                external: true
              },
              {
                id: 'menu-level-2.2.2',
                title: 'Menu Level 2.2.2',
                type: 'item',
                url: 'javascript:',
                external: true
              }
            ]
          }
        ]
      }
    ]
  }
];
