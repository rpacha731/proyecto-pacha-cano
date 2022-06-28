import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthControllerService, RequestDeLOGIN } from '../client';
import { LocalService } from '../shared/services/local-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup
  mostrarCon3: boolean = true

  constructor(private authService: AuthControllerService, 
    private fb: FormBuilder, 
    private router: Router, 
    private ls: LocalService) { }

  ngOnInit() {
    this.createFormLogin();
  }

  createFormLogin() {
    this.formLogin = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  get userEmailInvalido() {
    return this.formLogin.get('userEmail').invalid && this.formLogin.get('userEmail').touched;
  }
  get passwordLogInvalida() {
    return this.formLogin.get('password').invalid && this.formLogin.get('password').touched;
  }


  login() {
    if (this.formLogin.invalid) 
      return this.formLogin.markAllAsTouched();

    var loginReq: RequestDeLOGIN = {
      userEmail: this.formLogin.controls.userEmail.value,
      password: this.formLogin.controls.password.value
    };

    this.authService.loginUsingPOST(loginReq).subscribe(resp => {
      console.log(resp);
      document.getElementsByClassName("modal-backdrop")[0].className = "hide"

      Swal.fire({
        icon: 'success',
        title: 'Login exitoso',
        showCloseButton: true
      }).then(() => this.router.navigate(['/home']));
      
    }, err => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: err.error.error == 'Unauthorized' ? 'Email o contraseña incorrectas. Por favor, revise los campos y vuelva a intentar' : err.error.error,
        confirmButtonColor: "#373737",
      });
    })

  }

}
