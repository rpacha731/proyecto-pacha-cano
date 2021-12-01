import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IniciarSesionRequest } from './classes/login-request';
import { SignupRequest } from './classes/signup.request';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

    urlEndpoint: string;
        
    constructor(private http: HttpClient, private router: Router) {
      this.urlEndpoint = `${environment.urls.API_BASE_URL}`;  }
  
    signup(signupRequest: SignupRequest) {
      return this.http.post(`${this.urlEndpoint}/signup`, signupRequest);
    }
  
    headers = new HttpHeaders().set('Content-Type', 'application/json')

    login(usuario: IniciarSesionRequest) {
      return this.http.post(`${this.urlEndpoint}/login`, usuario, {headers: this.headers}).pipe(
        map((response:any) => {
          localStorage.setItem('authToken', response.authtoken);
          localStorage.setItem('userEmail', response.username);
          localStorage.setItem("roles", response.roles);
          return response;
        })
      );
    }
  
    getToken(): string | null {
      return localStorage.getItem('authtoken');
    }
  
    getuserEmail(): string | null {
      return localStorage.getItem('userEmail');
    }
   
    getRoles() : string | null {
      return localStorage.getItem('roles');
    }
  
  }
  