export interface MenuItemInterface {
  menuItems: MenuItem[]
  roleIDs: number[]
}

export interface MenuItem {
  id: number
  menuName: string
  routeUrl: string
  role_id: number
}
