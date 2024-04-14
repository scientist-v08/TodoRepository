import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, inject, input } from "@angular/core";
import { MenuItem, MenuItemInterface } from "../../types/menu-item.interface";
import { MenuItemsService } from "../../services/menuitem.service";
import { Subscription } from "rxjs";
import { LogoutService } from "../../services/logout.service";

@Component({
  selector:'todo-top-bar',
  templateUrl:'./top-bar.component.html'
})
export class TopbarComponent implements OnInit,OnChanges,OnDestroy{

  shouldGetItems = input.required<boolean>();
  unsubscribe$ : Subscription | null = null;
  items$ :MenuItem[]=[];
  private menuItems = inject(MenuItemsService);
  private loggingOut = inject(LogoutService);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['shouldGetItems'].currentValue===true){
      this.getItems();
    }
    else if(changes['shouldGetItems'].currentValue===false){
      setTimeout(()=>{
        this.items$=[]
      },500)
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem("getMenu")==="true"){
      this.getItems();
    }
    else{
      this.items$=[]
    }
  }

  ngOnDestroy(): void {
    if(this.unsubscribe$ !== null){
      this.unsubscribe$.unsubscribe();
    }
  }

  private getItems():void{
    this.unsubscribe$=this.menuItems.getMenuItems()
        .subscribe((res:MenuItemInterface) => this.items$=res.menuItems)
  }

  logout():void{
    this.items$=[];
    this.loggingOut.logout();
  }

}
