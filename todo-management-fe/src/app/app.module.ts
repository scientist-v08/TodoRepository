import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TopbarComponent } from './shared/components/top-bar/top-bar.component';
import { LoginComponent } from './shared/components/Login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './shared/services/auth.service';
import { MenuItemsService } from './shared/services/menuitem.service';
import { AuthInterceptor } from './shared/services/authInterceptor.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    MenuItemsService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
