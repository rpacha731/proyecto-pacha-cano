import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IniciarSesionRequest } from './classes/login-request';
import { SignupRequest } from './classes/signup.request';
import { LocalService } from './local-service.service';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

    urlEndpoint: string;
        
    constructor( private http: HttpClient, 
                 private router: Router, 
                 private ls: LocalService ) {
      this.urlEndpoint = `${environment.urls.API_BASE_URL}`;  }
  
    signup(signupRequest: SignupRequest) {
      return this.http.post(`${this.urlEndpoint}/signup`, signupRequest);
    }

    login(usuario: IniciarSesionRequest) {
      return this.http.post(`${this.urlEndpoint}/login`, usuario).pipe(
        map((response: any) => {
          this.ls.setJsonValue('authToken', response.tokenEncript);
          this.ls.setJsonValue('userEmail', response.userEmail);
          this.ls.setJsonValue("refreshToken", response.refreshToken);
          this.ls.setJsonValue("roles", response.roles);
          this.ls.setJsonValue("expiraEn", response.expiraEn);  
          return response;
        })
      );
    }
  
   
  }
  