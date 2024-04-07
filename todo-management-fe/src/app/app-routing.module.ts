import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/Login/login.component';
import { canActivateAdmin } from './shared/services/admin.guard';
import { canActivateUser } from './shared/services/user.guard';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'register',
    loadComponent: () => import('./shared/components/register/register.component').then(c => c.default)
  },
  {
    path:'admin/todo',
    loadComponent: () => import('./admin/admin.component').then(c => c.default),
    canActivate: [canActivateAdmin]
  },
  {
    path:'user/todo',
    loadComponent: () => import('./users/user.component').then(c => c.default),
    canActivate: [canActivateUser]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
