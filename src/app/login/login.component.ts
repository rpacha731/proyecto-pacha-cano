import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthControllerService, RequestDeLOGIN } from '../client';
import { AuthService } from '../shared/services/auth.service';
import { LocalService } from '../shared/services/local-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup
  mostrarCon3: boolean = true
  loading: boolean = false;

  constructor(private authServiceREST: AuthControllerService,
    private authService: AuthService, 
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

    this.loading = true;
    this.authServiceREST.loginUsingPOST(loginReq).subscribe(resp => {
      this.loading = false;     

      Swal.fire({
        icon: 'success',
        title: 'Login exitoso',
        showCloseButton: true
      }).then(() => {
        this.authService.setData(resp);
        this.router.navigate(['/home'])
      });
      
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
