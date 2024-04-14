import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { MenuItemInterface } from "../types/menu-item.interface";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class MenuItemsService{

  private url:string = environment.URL;
  private items = new BehaviorSubject<boolean>(false);
  private http = inject(HttpClient);
  getItem = this.items.asObservable();

  public getMenuItems() : Observable<MenuItemInterface>{
    const Url = this.url + "user/items";
    return this.http.get<MenuItemInterface>(Url);
  }

  public setItem(bo:boolean):void{
    this.items.next(bo);
  }

  public completeMenuItems():void{
    this.items.complete();
  }

}
