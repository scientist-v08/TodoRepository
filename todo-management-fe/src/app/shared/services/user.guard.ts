import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { RoleService } from "./role.service";

@Injectable({providedIn:'root'})
export class UserGuard {

  private isAdminRole = inject(RoleService);
  private router = inject(Router);

  canActivate(): boolean {
    if(this.isAdminRole.isUser === true) return true;
    else {
      this.router.navigateByUrl("");
      return false;
    }
  }

}

export const canActivateUser : CanActivateFn = (
  route : ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(UserGuard).canActivate();
}
