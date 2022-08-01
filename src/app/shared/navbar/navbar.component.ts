import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthControllerService, Configuration } from 'src/app/client';
import { ConfigurationParameters } from '../../client/configuration';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authServiceREST: AuthControllerService,
    private authService: AuthService,
    private router: Router) { 
      let config = new Configuration();
    config.accessToken = this.authService.getJwt();
    this.authServiceREST.configuration = config;
    }

  loading: boolean = false;
  email: string = "";

  

  ngOnInit(): void {
    
    this.email = this.authService.getEmailUser();
    let config = new Configuration();
    config.accessToken = this.authService.getJwt();
    this.authServiceREST.configuration = config;

  }

  logout() {
    this.loading = true;
    this.authServiceREST.logoutUsingPOST(this.authService.getJwt()).subscribe((response: any) => {
      
      this.loading = false;
      
      Swal.fire({
        title: 'Cerrando sesión',
        text: 'Sesión cerrada correctamente',
        icon: 'success',
      }).then(() => {
        this.authService.clearData();
        if (this.router.url === '/home') {
          window.location.reload();
        } else {
          this.router.navigate(['/home']);
        }
        
      });
    },
      (error: any) => {
        console.log(error);
      }
    );
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  };

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }



}
