import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { IniciarSesionRequest } from '../services/classes/login-request';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor( private authService: AuthService, 
               private fb: FormBuilder ) { }

  email: string = "";
  password: string = "";
  showPass: boolean = false;
  iniciarSesionReq: IniciarSesionRequest = {userEmail : "", password: ""};

  ngOnInit(): void { }

  showPassword(){
    this.showPass = !this.showPass;
  };

  ingresar() {

    console.log(this.email);
   
    this.iniciarSesionReq.userEmail = this.email;
    this.iniciarSesionReq.password = this.password;

    this.authService.login(this.iniciarSesionReq).subscribe(response => {
      
        console.log(response);
        $("#modalIngresar").toggle();

      
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: err.error.error == 'Unauthorized' ? 'Email o contraseña incorrectas. Por favor, revise los campos y vuelva a intentar' : err.error.error,
        confirmButtonColor: "#373737",
      });
    });
  }

}
