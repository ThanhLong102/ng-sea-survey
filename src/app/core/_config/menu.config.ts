export class MenuConfig {
  public defaults: any = {
    header: {
      self: {},
      items: [
        {
          title: 'Dashboards',
          root: true,
          alignment: 'left',
          page: '/dashboard',
          translate: 'MENU.DASHBOARD',
        },
        {
          title: 'Applications',
          root: true,
          alignment: 'left',
          toggle: 'click',
          submenu: [
            {
              title: 'eCommerce',
              bullet: 'dot',
              icon: 'flaticon-business',
              permission: 'accessToECommerceModule',
              submenu: [
                {
                  title: 'Customers',
                  page: '/ecommerce/customers'
                },
                {
                  title: 'Products',
                  page: '/ecommerce/products'
                },
              ]
            },
            {
              title: 'User Management',
              bullet: 'dot',
              icon: 'flaticon-user',
              submenu: [
                {
                  title: 'Users',
                  page: '/user-management/users'
                },
                {
                  title: 'Roles',
                  page: '/user-management/roles'
                }
              ]
            },
          ]
        },
        {
          title: 'Components',
          root: true,
          alignment: 'left',
          toggle: 'click',
          submenu: [
            {
              title: 'Google Material',
              bullet: 'dot',
              icon: 'flaticon-interface-7',
              submenu: [
                {
                  title: 'Form Controls',
                  bullet: 'dot',
                  submenu: [
                    {
                      title: 'Auto Complete',
                      page: '/material/form-controls/autocomplete',
                      permission: 'accessToECommerceModule'
                    },
                    {
                      title: 'Checkbox',
                      page: '/material/form-controls/checkbox'
                    },
                    {
                      title: 'Radio Button',
                      page: '/material/form-controls/radiobutton'
                    },
                    {
                      title: 'Datepicker',
                      page: '/material/form-controls/datepicker'
                    },
                    {
                      title: 'Form Field',
                      page: '/material/form-controls/formfield'
                    },
                    {
                      title: 'Input',
                      page: '/material/form-controls/input'
                    },
                    {
                      title: 'Select',
                      page: '/material/form-controls/select'
                    },
                    {
                      title: 'Slider',
                      page: '/material/form-controls/slider'
                    },
                    {
                      title: 'Slider Toggle',
                      page: '/material/form-controls/slidertoggle'
                    }
                  ]
                },
                {
                  title: 'Navigation',
                  bullet: 'dot',
                  submenu: [
                    {
                      title: 'Menu',
                      page: '/material/navigation/menu'
                    },
                    {
                      title: 'Sidenav',
                      page: '/material/navigation/sidenav'
                    },
                    {
                      title: 'Toolbar',
                      page: '/material/navigation/toolbar'
                    }
                  ]
                },
                {
                  title: 'Layout',
                  bullet: 'dot',
                  submenu: [
                    {
                      title: 'Card',
                      page: '/material/layout/card'
                    },
                    {
                      title: 'Divider',
                      page: '/material/layout/divider'
                    },
                    {
                      title: 'Expansion panel',
                      page: '/material/layout/expansion-panel'
                    },
                    {
                      title: 'Grid list',
                      page: '/material/layout/grid-list'
                    },
                    {
                      title: 'List',
                      page: '/material/layout/list'
                    },
                    {
                      title: 'Tabs',
                      page: '/material/layout/tabs'
                    },
                    {
                      title: 'Stepper',
                      page: '/material/layout/stepper'
                    },
                    {
                      title: 'Tree',
                      page: '/material/layout/tree'
                    }
                  ]
                },
                {
                  title: 'Buttons & Indicators',
                  bullet: 'dot',
                  submenu: [
                    {
                      title: 'Button',
                      page: '/material/buttons-and-indicators/button'
                    },
                    {
                      title: 'Button toggle',
                      page: '/material/buttons-and-indicators/button-toggle'
                    },
                    {
                      title: 'Chips',
                      page: '/material/buttons-and-indicators/chips'
                    },
                    {
                      title: 'Icon',
                      page: '/material/buttons-and-indicators/icon'
                    },
                    {
                      title: 'Progress bar',
                      page: '/material/buttons-and-indicators/progress-bar'
                    },
                    {
                      title: 'Progress spinner',
                      page: '/material/buttons-and-indicators/progress-spinner'
                    },
                    {
                      title: 'Ripples',
                      page: '/material/buttons-and-indicators/ripples'
                    }
                  ]
                },
                {
                  title: 'Popups & Modals',
                  bullet: 'dot',
                  submenu: [
                    {
                      title: 'Bottom sheet',
                      page: '/material/popups-and-modals/bottom-sheet'
                    },
                    {
                      title: 'Dialog',
                      page: '/material/popups-and-modals/dialog'
                    },
                    {
                      title: 'Snackbar',
                      page: '/material/popups-and-modals/snackbar'
                    },
                    {
                      title: 'Tooltip',
                      page: '/material/popups-and-modals/tooltip'
                    }
                  ]
                },
                {
                  title: 'Data table',
                  bullet: 'dot',
                  submenu: [
                    {
                      title: 'Paginator',
                      page: '/material/data-table/paginator'
                    },
                    {
                      title: 'Sort header',
                      page: '/material/data-table/sort-header'
                    },
                    {
                      title: 'Table',
                      page: '/material/data-table/table'
                    }
                  ]
                }
              ]
            },
            {
              title: 'Ng-Bootstrap',
              bullet: 'dot',
              icon: 'flaticon-web',
              submenu: [
                {
                  title: 'Accordion',
                  page: '/ngbootstrap/accordion'
                },
                {
                  title: 'Alert',
                  page: '/ngbootstrap/alert'
                },
                {
                  title: 'Buttons',
                  page: '/ngbootstrap/buttons'
                },
                {
                  title: 'Carousel',
                  page: '/ngbootstrap/carousel'
                },
                {
                  title: 'Collapse',
                  page: '/ngbootstrap/collapse'
                },
                {
                  title: 'Datepicker',
                  page: '/ngbootstrap/datepicker'
                },
                {
                  title: 'Dropdown',
                  page: '/ngbootstrap/dropdown'
                },
                {
                  title: 'Modal',
                  page: '/ngbootstrap/modal'
                },
                {
                  title: 'Pagination',
                  page: '/ngbootstrap/pagination'
                },
                {
                  title: 'Popover',
                  page: '/ngbootstrap/popover'
                },
                {
                  title: 'Progressbar',
                  page: '/ngbootstrap/progressbar'
                },
                {
                  title: 'Rating',
                  page: '/ngbootstrap/rating'
                },
                {
                  title: 'Tabs',
                  page: '/ngbootstrap/tabs'
                },
                {
                  title: 'Timepicker',
                  page: '/ngbootstrap/timepicker'
                },
                {
                  title: 'Tooltips',
                  page: '/ngbootstrap/tooltip'
                },
                {
                  title: 'Typehead',
                  page: '/ngbootstrap/typehead'
                }
              ]
            },
          ]
        },
        // {
        //   title: 'Applications',
        //   root: true,
        //   alignment: 'left',
        //   toggle: 'click',
        //   submenu: [
        //     {
        //       title: 'eCommerce',
        //       bullet: 'dot',
        //       icon: 'flaticon-business',
        //       permission: 'accessToECommerceModule',
        //       submenu: [
        //         {
        //           title: 'Customers',
        //           page: '/ecommerce/customers'
        //         },
        //         {
        //           title: 'Products',
        //           page: '/ecommerce/products'
        //         },
        //       ]
        //     },
        //     {
        //       title: 'User Management',
        //       bullet: 'dot',
        //       icon: 'flaticon-user',
        //       submenu: [
        //         {
        //           title: 'Users',
        //           page: '/user-management/users'
        //         },
        //         {
        //           title: 'Roles',
        //           page: '/user-management/roles'
        //         }
        //       ]
        //     },
        //     {
        //       title: 'Menu Management',
        //       bullet: 'dot',
        //       icon: 'flaticon-user',
        //       page: '/menu-management'
        //     },
        //   ]
        // },
        // {
        //   title: 'Custom',
        //   root: true,
        //   alignment: 'left',
        //   toggle: 'click',
        //   submenu: [
        //     {
        //       title: 'Error Pages',
        //       bullet: 'dot',
        //       icon: 'flaticon2-list-2',
        //       submenu: [
        //         {
        //           title: 'Error 1',
        //           page: '/error/error-1'
        //         },
        //         {
        //           title: 'Error 2',
        //           page: '/error/error-2'
        //         },
        //         {
        //           title: 'Error 3',
        //           page: '/error/error-3'
        //         },
        //         {
        //           title: 'Error 4',
        //           page: '/error/error-4'
        //         },
        //         {
        //           title: 'Error 5',
        //           page: '/error/error-5'
        //         },
        //         {
        //           title: 'Error 6',
        //           page: '/error/error-6'
        //         },
        //       ]
        //     },
        //     {
        //       title: 'Wizard',
        //       bullet: 'dot',
        //       icon: 'flaticon2-mail-1',
        //       submenu: [
        //         {
        //           title: 'Wizard 1',
        //           page: '/wizard/wizard-1'
        //         },
        //         {
        //           title: 'Wizard 2',
        //           page: '/wizard/wizard-2'
        //         },
        //         {
        //           title: 'Wizard 3',
        //           page: '/wizard/wizard-3'
        //         },
        //         {
        //           title: 'Wizard 4',
        //           page: '/wizard/wizard-4'
        //         },
        //       ]
        //     },
        //   ]
        // },
      ]
    },
    aside: {
      self: {},
      items: [
        {section: 'Applications'},
        {
          title: 'Danh S??ch Ph??n Quy???n',
          root: true,
          icon: 'flaticon2-expand',
          page: '/listRoles'
        },
        {
          title: 'Ph??n quy???n bank user',
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-expand',
          page: '/decentralize-bank-user'
        },
        {
          title: 'Qu???n l?? vai tr??',
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          submenu: [
            {
              title: 'Qu???n l?? vai tr?? User kh??ch h??ng',
              page: '/roles-Management/lstRoles'
            },
            {
              title: 'Qu???n l?? vai tr?? h??? th???ng',
              page: '/roles-Management/systemRoles'
            }
          ]
        },
        {
          title: 'Qu???n l?? Menu',
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          page: '/menu-management'
        },
        {
          title: 'Qu???n l?? h??? s??',
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          page: '/transaction-management'

        },
        {
          title: 'Qu???n l?? li??n k???t',
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          page: '/link-management'
        },
        {
          title: 'Qu???n l?? bank user',
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          page: '/bank-user'
        },
        {
          title: 'Ph??n quy???n theo vai tr?? h??? th???ng',
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          page: '/menu-role'
        },
        {
          title: 'Qu???n l?? Agent',
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          page: '/agent-management'
        },
        {
          title: 'Qu???n l?? chi nh??nh Agent',
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          page: '/branch-agent'
        },
        {
          title: 'QL Agent',
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          page: '/agent'

        },
        // {section: 'Custom'},
        // {
        //   title: 'Error Pages',
        //   root: true,
        //   bullet: 'dot',
        //   icon: 'flaticon2-list-2',
        //   submenu: [
        //     {
        //       title: 'Error 1',
        //       page: '/error/error-1'
        //     },
        //     {
        //       title: 'Error 2',
        //       page: '/error/error-2'
        //     },
        //     {
        //       title: 'Error 3',
        //       page: '/error/error-3'
        //     },
        //     {
        //       title: 'Error 4',
        //       page: '/error/error-4'
        //     },
        //     {
        //       title: 'Error 5',
        //       page: '/error/error-5'
        //     },
        //     {
        //       title: 'Error 6',
        //       page: '/error/error-6'
        //     },
        //   ]
        // },
        // {
        //   title: 'Wizard',
        //   root: true,
        //   bullet: 'dot',
        //   icon: 'flaticon2-mail-1',
        //   submenu: [
        //     {
        //       title: 'Wizard 1',
        //       page: '/wizard/wizard-1'
        //     },
        //     {
        //       title: 'Wizard 2',
        //       page: '/wizard/wizard-2'
        //     },
        //     {
        //       title: 'Wizard 3',
        //       page: '/wizard/wizard-3'
        //     },
        //     {
        //       title: 'Wizard 4',
        //       page: '/wizard/wizard-4'
        //     },
        //   ]
        // },
      ]
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}

export const MenuList: any =
  [{
    menuItemId: 2510,
    parentId: 0,
    cssClass: null,
    title: 'Qu???n l?? li??n k???t',
    icon: 'flaticon2-user-outline-symbol',
    lev: 1,
    page: '/link-management',
    orderCode: 6,
    root: true,
    bullet: 'dot',
    submenu: []
  }, {
    menuItemId: 2509,
    parentId: 0,
    cssClass: null,
    title: 'Qu???n l?? h??? s??',
    icon: 'flaticon2-user-outline-symbol',
    lev: 1,
    orderCode: 5,
    root: true,
    bullet: 'dot',
    submenu: [
      {
        menuItemId: 2509,
        parentId: 0,
        cssClass: null,
        title: 'Qu???n l?? h??? s?? VNP',
        icon: 'flaticon2-user-outline-symbol',
        lev: 1,
        page: '/transaction-management',
        orderCode: 5,
        root: true,
        bullet: 'dot',
        submenu: []
      },
      {
        menuItemId: 2509,
        parentId: 0,
        cssClass: null,
        title: 'Qu???n l?? h??? s?? PTF',
        icon: 'flaticon2-user-outline-symbol',
        lev: 1,
        page: '/records-management-ptf',
        orderCode: 5,
        root: true,
        bullet: 'dot',
        submenu: []
      },
    ]
  }, {
    menuItemId: 2508,
    parentId: 0,
    cssClass: null,
    title: 'Qu???n l?? Agent',
    icon: 'flaticon2-user-outline-symbol',
    lev: 1,
    page: '/agent-management',
    orderCode: 4,
    root: true,
    bullet: 'dot',
    submenu: []
  }, {
    menuItemId: 2507,
    parentId: 0,
    cssClass: null,
    title: 'Qu???n l?? Chi nh??nh Agent',
    icon: 'flaticon2-user-outline-symbol',
    lev: 1,
    page: '/branch-agent',
    orderCode: 3,
    root: true,
    bullet: 'dot',
    submenu: []
  }, {
    bullet: 'dot',
    cssClass: null,
    icon: 'flaticon2-user-outline-symbol',
    lev: 1,
    menuItemId: 2507,
    orderCode: 3,
    page: '/agent',
    parentId: 0,
    root: true,
    submenu: [],
    title: 'Qu???n l?? ??VKD'
  },  {
    bullet: 'dot',
    cssClass: null,
    icon: 'flaticon2-user-outline-symbol',
    lev: 1,
    menuItemId: 2507,
    orderCode: 3,
    page: '/cut-off-time',
    parentId: 0,
    root: true,
    submenu: [],
    title: 'X??? l?? Cut Off Time'
  },{
    bullet: 'dot',
    cssClass: null,
    icon: 'flaticon2-user-outline-symbol',
    lev: 1,
    menuItemId: 2507,
    orderCode: 3,
    parentId: 0,
    root: true,
    submenu: [
      {
        bullet: 'dot',
        cssClass: null,
        icon: 'flaticon2-user-outline-symbol',
        lev: 1,
        menuItemId: 2507,
        orderCode: 3,
        page: '/manage-post-link',
        parentId: 0,
        root: true,
        submenu: [],
        title: 'Qu???n l?? li??n k???t b??u t??'
      },
      {
        bullet: 'dot',
        cssClass: null,
        icon: 'flaticon2-user-outline-symbol',
        lev: 1,
        menuItemId: 2506,
        orderCode: 3,
        page: '/post-office',
        parentId: 0,
        root: true,
        submenu: [],
        title: 'Qu???n l?? b??u c???c'
      },
    ],
    title: 'D???ch v??? thu ti???n h??ng COD'
  },
  ]
