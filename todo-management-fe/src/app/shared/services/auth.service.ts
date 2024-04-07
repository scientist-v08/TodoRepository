import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { LoginResponse } from "../types/login-response.interface";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { LoginOrRegister } from "../types/login.interface";
import { ResponseInterface } from "../types/response.interface";

@Injectable()
export class AuthService{

  private url:string = environment.URL;
  private http = inject(HttpClient);

  public loginAccount(loginCredentials:LoginOrRegister): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.url+"auth/login",loginCredentials)
  }

  public registerAccount(registerCredentials:LoginOrRegister): Observable<ResponseInterface>{
    return this.http.post<ResponseInterface>(this.url+"auth/register",registerCredentials)
  }

}
