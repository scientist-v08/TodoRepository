import { Component, OnDestroy, inject } from '@angular/core';
import { MenuItemsService } from './shared/services/menuitem.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'todo-root',
  template:`
  <todo-top-bar [shouldGetItems]="itemsObtain"></todo-top-bar>
  <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnDestroy {

  itemsObtain:boolean=false
  private menuItems = inject(MenuItemsService);
  unsubscribe$ : Subscription | null = null

  constructor(){
    this.unsubscribe$ = this.menuItems.getItem.subscribe({
      next: (res:boolean)=>{
        if(res===true){
          this.itemsObtain=res;
        }
        else if(res===false){
          this.itemsObtain=false;
        }
      },
      error: ()=>console.log("error"),
      complete: ()=> console.log("complete")
    })
  }

  ngOnDestroy(): void {
    if(this.unsubscribe$!==null){
      this.unsubscribe$.unsubscribe();
    }
  }
}
