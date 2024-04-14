import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { RoleService } from "./role.service";
import { LogoutService } from "./logout.service";

@Injectable({providedIn:'root'})
export class UserGuard {

  private isAdminRole = inject(RoleService);
  private router = inject(Router);
  private loggingOut = inject(LogoutService);

  canActivate(): boolean {
    if(this.isAdminRole.getisUser() === true) return true;
    else {
      this.loggingOut.logout();
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
