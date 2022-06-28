import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthControllerService, RequestDeLOGIN } from '../client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  mostrarCon1: boolean = true
  mostrarCon2: boolean = true
  form: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService: AuthControllerService,
    private router: Router) { }

  ngOnInit() {
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

}
