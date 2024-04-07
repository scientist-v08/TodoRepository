import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { MenuItem, MenuItemInterface } from "../types/menu-item.interface";
import { Observable, Subject } from "rxjs";

@Injectable()
export class MenuItemsService{

  private url:string = environment.URL;
  items = new Subject<MenuItem[]>();
  private http = inject(HttpClient);

  public getMenuItems() : Observable<MenuItemInterface>{
    const Url = this.url + "user/items";
    return this.http.get<MenuItemInterface>(Url);
  }

  public setMenuItems(menuItems:MenuItem[]):void{
    this.items.next(menuItems);
  }

}
