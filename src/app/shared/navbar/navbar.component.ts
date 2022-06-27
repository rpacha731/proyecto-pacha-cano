import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthControllerService, RequestDeLOGIN } from 'src/app/client';

import Swal from 'sweetalert2';
import { LocalService } from '../services/local-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('modalIngresar') modalIngresar: ElementRef

  form: FormGroup
  formLogin: FormGroup
  mostrarCon1: boolean = true
  mostrarCon2: boolean = true
  mostrarCon3: boolean = true

  constructor( private authService: AuthControllerService, 
               private fb: FormBuilder, 
               private router: Router, 
               private ls: LocalService ) { 
               }

  ngOnInit(): void { 
    this.createFormSignup();
    this.createFormLogin();
  }

  createFormSignup() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required]]
    })
  }

  get nombreInvalido() {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }
  get apellidoInvalido() {
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }
  get emailInvalido() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }
  get passwordInvalida() {
    return this.form.get('password').invalid && this.form.get('password').touched;
  }
  get passwordInvalida2() {
    return this.form.get('password2').invalid && this.form.get('password2').touched;
  }
  get passwordDistinta() {
    const password = this.form.get('password').value;
    const password2 = this.form.get('password2').value;
    if (password2 != "")
      return (password == password2) ? false : true;
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

  signUp() {
    if (this.form.invalid) 
      return this.form.markAllAsTouched();

      var signupRequest: RequestDeLOGIN = {
        userEmail: this.form.controls.email.value,
        password: this.form.controls.password.value
      }

    console.log(signupRequest)

    this.authService.registroUsingPOST(signupRequest).subscribe((response: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        showCloseButton: true
      }).then(() => this.router.navigate(['/home']));
    }, (err: any) => {
      Swal.fire({
        icon: 'warning',
        title: 'Usuario existente',
        text: "¡Ya existe el usuario! Por favor, ingrese con su cuenta o pruebe otro email.",
        showCloseButton: true,
        confirmButtonText: "Iniciar Sesión"
      }).then((result) => {
        result.isConfirmed ? this.router.navigate(['/login']) : Swal.close()            
      });
    });
  }

  ingresar() {
    if (this.formLogin.invalid) 
      return this.formLogin.markAllAsTouched();

    var loginReq: RequestDeLOGIN = {
      userEmail: this.formLogin.controls.userEmail.value,
      password: this.formLogin.controls.password.value
    };

    this.authService.loginUsingPOST(loginReq).subscribe(resp => {
      console.log(resp);
      $("#modalIngresar").toggle();
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
