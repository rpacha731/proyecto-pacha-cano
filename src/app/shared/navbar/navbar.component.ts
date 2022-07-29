import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthControllerService } from 'src/app/client';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authServiceREST: AuthControllerService,
    private authService: AuthService,
    private router: Router) { }

  loading: boolean = false;

  ngOnInit(): void {
  }

  logout() {
    this.loading = true;
    this.authServiceREST.logoutUsingPOST(this.authService.getJwt()).subscribe((response: any) => {
      this.authService.clearData();
      this.loading = false;
      Swal.fire({
        title: 'Cerrando sesión',
        text: 'Sesión cerrada correctamente',
        icon: 'success',
      }).then(() => {
        this.router.navigate(['/home']);
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
