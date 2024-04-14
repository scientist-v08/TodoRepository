import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { RoleService } from "./role.service";
import { MenuItemsService } from "./menuitem.service";

@Injectable({providedIn:'root'})
export class LogoutService {

  private menuItems = inject(MenuItemsService);
  private roles = inject(RoleService);
  private router = inject(Router);

  public logout():void{
    localStorage.removeItem("token");
    this.roles.setAdmin(false);
    this.roles.setUser(false);
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isUser");
    localStorage.removeItem("getMenu");
    this.menuItems.setItem(false);
    // this.menuItems.completeMenuItems();
    this.router.navigateByUrl("");
  }

}
