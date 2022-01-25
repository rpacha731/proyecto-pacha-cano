import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { IniciarSesionRequest } from '../services/classes/login-request';
import { SignupRequest } from '../services/classes/signup.request';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  form: FormGroup
  mostrarCon1: boolean = true
  mostrarCon2: boolean = true
  signupRequest: SignupRequest

  constructor( private authService: AuthService, 
               private fb: FormBuilder, private router: Router ) { 
                this.signupRequest = new SignupRequest();
               }

  email: string = "";
  password: string = "";
  showPass: boolean = false;
  iniciarSesionReq: IniciarSesionRequest = {userEmail : "", password: ""};

  ngOnInit(): void { 
    this.createFormSignup(); 
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

  signUp() {
    if (this.form.invalid) 
      return this.form.markAllAsTouched();

    this.signupRequest.nombre = this.form.controls.nombre.value
    this.signupRequest.apellido = this.form.controls.apellido.value
    this.signupRequest.email = this.form.controls.email.value
    this.signupRequest.password = this.form.controls.password.value

    console.log(this.signupRequest)

    this.authService.signup(this.signupRequest).subscribe((response: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        showCloseButton: true
      }).then(() => this.router.navigate(['/home']));
    }, (err: any) => {
      Swal.fire({
        icon: 'warning',
        title: 'Usuario existente',
        text: "¡Ya existe el usuario! Por favor, ingrese con su cuenta o verifique su cuenta con su email.",
        showCloseButton: true,
        confirmButtonText: "Iniciar Sesión"
      }).then((result) => {
        result.isConfirmed ? this.router.navigate(['/login']) : Swal.close()            
      });
    });
  }

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
