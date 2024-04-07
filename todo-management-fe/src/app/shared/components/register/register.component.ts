import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginOrRegister } from "../../types/login.interface";
import { AuthService } from "../../services/auth.service";
import { Subject, takeUntil } from "rxjs";
import { Router, RouterModule } from "@angular/router";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ResponseInterface } from "../../types/response.interface";

@Component({
  standalone:true,
  imports:[ReactiveFormsModule,RouterModule,MatSnackBarModule],
  selector:'todo-register',
  templateUrl:'./register.component.html'
})
export default class RegisterComponent implements OnInit,OnDestroy {

  registerForm!:FormGroup;
  private unsubscribe$ = new Subject<void>();
  private authService = inject(AuthService);
  private router = inject(Router);
  private _snackBar=inject(MatSnackBar);

  ngOnInit(): void {
    this.formInitialization();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private formInitialization():void{
    this.registerForm = new FormGroup({
      'usernameOrEmail': new FormControl('',[Validators.required,Validators.email]),
      'password': new FormControl('',[Validators.required])
    });
  }

  public onSubmit(): void{
    const registerCredentials:LoginOrRegister = {
      'usernameOrEmail': this.registerForm.value.usernameOrEmail,
      'password': this.registerForm.value.password
    }
    this.authService.registerAccount(registerCredentials)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: ResponseInterface)=> {
          this._snackBar.open('Success', res.message, {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          });
          this.router.navigateByUrl("")
        },
        error: ()=> {
          this._snackBar.open('Failure', 'Failed to register', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          });
        }
      });
  }

}
