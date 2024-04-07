import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { MenuItem } from "../../types/menu-item.interface";
import { MenuItemsService } from "../../services/menuitem.service";
import { Subject, takeUntil } from "rxjs";
import { RoleService } from "../../services/role.service";
import { Router } from "@angular/router";

@Component({
  selector:'todo-top-bar',
  templateUrl:'./top-bar.component.html'
})
export class TopbarComponent implements OnInit,OnDestroy{

  unsubscribe$ = new Subject<void>();
  items:MenuItem[]=[];
  private menuItems = inject(MenuItemsService);
  private roles = inject(RoleService);
  private router = inject(Router);

  ngOnInit(): void {
    this.menuItems.items
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res:MenuItem[]) => this.items=res
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  logout():void{
    localStorage.removeItem("token");
    this.roles.setAdmin(false);
    this.roles.setUser(false);
    this.items=[];
    this.menuItems.setMenuItems([]);
    this.router.navigateByUrl("");
  }

}
