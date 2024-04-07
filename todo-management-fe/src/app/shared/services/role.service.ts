import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class RoleService{

  private _isAdmin: boolean = false;
  private _isUser: boolean = false;

  public get isUser(): boolean {
    return this._isUser;
  }

  public setUser(value: boolean) {
    this._isUser = value;
  }

  public get isAdmin(): boolean {
    return this._isAdmin;
  }

  public setAdmin(value: boolean) {
    this._isAdmin = value;
  }

}
