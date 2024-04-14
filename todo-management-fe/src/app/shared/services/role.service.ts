import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class RoleService{

  private _isAdmin: boolean = false;
  private _isUser: boolean = false;

  public getisUser(): boolean {
    if(localStorage.getItem("isUser") === "true") return true;
    return this._isUser;
  }

  public setUser(value: boolean) {
    this._isUser = value;
    localStorage.setItem("isUser","true");
  }

  public getisAdmin(): boolean {
    if(localStorage.getItem("isAdmin") === "true") return true;
    return this._isAdmin;
  }

  public setAdmin(value: boolean) {
    localStorage.setItem("isAdmin","true");
    this._isAdmin = value;
  }

}
