import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { RoleService } from "./role.service";
import { LogoutService } from "./logout.service";

@Injectable({providedIn:'root'})
export class AdminGuard {

  private isAdminRole = inject(RoleService);
  private router = inject(Router);
  private loggingOut = inject(LogoutService);

  canActivate(): boolean {
    if(this.isAdminRole.getisAdmin() === true) return true;
    else {
      this.loggingOut.logout();
      this.router.navigateByUrl("");
      return false;
    }
  }

}

export const canActivateAdmin : CanActivateFn = (
  route : ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AdminGuard).canActivate();
}
