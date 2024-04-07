import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginOrRegister } from "../../types/login.interface";
import { AuthService } from "../../services/auth.service";
import { Subject, takeUntil } from "rxjs";
import { LoginResponse } from "../../types/login-response.interface";
import { Router } from "@angular/router";
import { MenuItemsService } from "../../services/menuitem.service";
import { MenuItemInterface } from "../../types/menu-item.interface";
import { RoleService } from "../../services/role.service";

@Component({
  selector:'todo-login',
  templateUrl:'./login.component.html'
})
export class LoginComponent{

  public loginForm!: FormGroup;
  private unsubscribe$ = new Subject<void>();
  private authService = inject(AuthService);
  private menuItems = inject(MenuItemsService);
  private router = inject(Router);
  private role = inject(RoleService);

  public ngOnInit(): void{
    this.formInitialization();
  }

  public ngOnDestroy(): void{
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private formInitialization(): void{
    this.loginForm = new FormGroup({
      'usernameOrEmail': new FormControl('',[Validators.required,Validators.email]),
      'password': new FormControl('',[Validators.required])
    });
  }

  public onSubmit(): void{
    const credentials:LoginOrRegister = {
      'usernameOrEmail': this.loginForm.value.usernameOrEmail,
      'password': this.loginForm.value.password
    }
    this.authService.loginAccount(credentials)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res:LoginResponse)=>{
          localStorage.setItem("token",res.accessToken);
          this.successfulLogin();
        },
        error: ()=>console.log("Error")
      });
  }

  private successfulLogin():void{
    this.menuItems.getMenuItems()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res:MenuItemInterface) => {
          this.menuItems.setMenuItems(res.menuItems);
          res.roleIDs.forEach(element => {
            if(element===2) {
              this.role.setAdmin(true);
              this.router.navigateByUrl('/admin/todo');
            }
            else if(element===1) {
              this.role.setUser(true);
              this.router.navigateByUrl('/user/todo');
            }
          });
        },
        error: (err:any) => console.log(err)
      })
  }

}
