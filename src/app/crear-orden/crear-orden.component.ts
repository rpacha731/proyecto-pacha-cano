import { Component, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Chofer, OrdenDeCarga, Producto, Camion, Cliente, OrdenCargaControllerService } from '../client';

@Component({
  selector: 'app-crear-orden',
  templateUrl: './crear-orden.component.html',
  styleUrls: ['./crear-orden.component.scss']
})
export class CrearOrdenComponent implements OnInit {

  form: FormGroup
  productos: Producto[] = [];
  camiones: Camion[] = [];
  choferes: Chofer[] = [];
  clientes: Cliente[] = [];

  newPro: boolean = false;
  newCho: boolean = false;
  newCli: boolean = false;
  newCam: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private apiOrdenes: OrdenCargaControllerService) { }

  ngOnInit() {
    this.crearForm();
    this.getProductos();
    this.getCamiones();
    this.getClientes();
    this.getChoferes();
  }

  getProductos() {
    this.apiOrdenes.listadoProductosUsingGET().subscribe((resp: any) => {
      this.productos = resp;
    }, err => {
      console.log(err)
    });
  }

  getCamiones() {
    this.apiOrdenes.listadoCamionesUsingGET().subscribe((resp: any) => {
      this.camiones = resp;
    }, err => {
      console.log(err)
    });
  }

  getClientes() {
    this.apiOrdenes.listadoClientesUsingGET().subscribe((resp: any) => {
      this.clientes = resp;
    }, err => {
      console.log(err)
    });
  }

  getChoferes() {
    this.apiOrdenes.listadoChoferesUsingGET().subscribe((resp: any) => {
      this.choferes = resp;
    }, err => {
      console.log(err)
    });
  }

  crearForm() {
    this.form = this.fb.group({
      numOrden: ['', Validators.required],
      codExt: ['', Validators.required],
      fecHoraTurno: ['', Validators.required],
      preset: ['', Validators.required],
      chofer: ['', Validators.required],
      camion: ['', Validators.required],
      cliente: ['', Validators.required],
      producto: ['', Validators.required],

      nombreProducto: ['', Validators.required],
      descProducto: ['', Validators.required],
      codExtProducto: ['', Validators.required],

      cisterCamion: ['', Validators.required],
      codExtCamion: ['', Validators.required],
      patenteCamion: ['', Validators.required],
      descCamion: ['', Validators.required],

      contCliente: ['', Validators.required],
      razSocCliente: ['', Validators.required],
      codExtCliente: ['', Validators.required],

      nombreChofer: ['', Validators.required],
      apellidoChofer: ['', Validators.required],
      dniChofer: ['', [Validators.minLength(7), Validators.required]],
      codExtChofer: ['', Validators.required]
    })
  }

  get numOrdenInvalido() {
    return this.form.get('numOrden').invalid && this.form.get('numOrden').touched;
  }
  get codExtInvalido() {
    return this.form.get('codExt').invalid && this.form.get('codExt').touched;
  }
  get nomProdInvalido() {
    return this.form.get('nombreProducto').invalid && this.form.get('nombreProducto').touched;
  }
  get descProdInvalido() {
    return this.form.get('descProducto').invalid && this.form.get('descProducto').touched;
  }
  get codExtProdInvalido() {
    return this.form.get('codExtProducto').invalid && this.form.get('codExtProducto').touched;
  }
  get cistInvalido() {
    return this.form.get('cisterCamion').invalid && this.form.get('cisterCamion').touched;
  }
  get codExtCamInvalido() {
    return this.form.get('codExtCamion').invalid && this.form.get('codExtCamion').touched;
  }
  get patCamInvalido() {
    return this.form.get('patenteCamion').invalid && this.form.get('patenteCamion').touched;
  }
  get descCamInvalido() {
    return this.form.get('descCamion').invalid && this.form.get('descCamion').touched;
  }
  get fecHoraInvalido() {
    return this.form.get('fecHoraTurno').invalid && this.form.get('fecHoraTurno').touched;
  }
  get presetInvalido() {
    return this.form.get('preset').invalid && this.form.get('preset').touched;
  }
  get contCliInvalido() {
    return this.form.get('contCliente').invalid && this.form.get('contCliente').touched;
  }
  get razSocInvalido() {
    return this.form.get('razSocCliente').invalid && this.form.get('razSocCliente').touched;
  }
  get codExtCliInvalido() {
    return this.form.get('codExtCliente').invalid && this.form.get('codExtCliente').touched;
  }
  get nomChoInvalido() {
    return this.form.get('nombreChofer').invalid && this.form.get('nombreChofer').touched;
  }
  get apeChoInvalido() {
    return this.form.get('apellidoChofer').invalid && this.form.get('apellidoChofer').touched;
  }
  get dniChoInvalido() {
    return this.form.get('dniChofer').invalid && this.form.get('dniChofer').touched;
  }
  get codExtChoInvalido() {
    return this.form.get('codExtChofer').invalid && this.form.get('codExtChofer').touched;
  }
  get choInvalido() {
    return this.form.get('chofer').invalid && this.form.get('chofer').touched;
  }
  get camInvalido() {
    return this.form.get('camion').invalid && this.form.get('camion').touched;
  }
  get cliInvalido() {
    return this.form.get('cliente').invalid && this.form.get('cliente').touched;
  }
  get proInvalido() {
    return this.form.get('producto').invalid && this.form.get('producto').touched;
  }

  crear() {

    Object.values(this.form.controls).forEach(control => {
      control.markAsUntouched();
    });

    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {

        if (key == 'nombreProducto' && !this.newPro)
          return;
        if (key == 'descProducto' && !this.newPro)
          return;
        if (key == 'codExtProducto' && !this.newPro)
          return;

        if (key == 'nombreChofer' && !this.newCho)
          return;
        if (key == 'apellidoChofer' && !this.newCho)
          return;
        if (key == 'dniChofer' && !this.newCho)
          return;
        if (key == 'codExtChofer' && !this.newCho)
          return;

        if (key == 'cisterCamion' && !this.newCam)
          return;
        if (key == 'codExtCamion' && !this.newCam)
          return;
        if (key == 'patenteCamion' && !this.newCam)
          return;
        if (key == 'descCamion' && !this.newCam)
          return;

        if (key == 'nombreCliente' && !this.newCli)
          return;
        if (key == 'razSocCliente' && !this.newCli)
          return;
        if (key == 'codExtCliente' && !this.newCli)
          return;
        if (key == 'contCliente' && !this.newCli)
          return;

        if (key == 'producto' && this.newPro)
          return;
        if (key == 'chofer' && this.newCho)
          return;
        if (key == 'camion' && this.newCam)
          return;
        if (key == 'cliente' && this.newCli)
          return;

        this.form.get(key).markAsTouched();

      });

    };

    var prod: Producto
    var cho: Chofer
    var cam: Camion
    var cli: Cliente

    if (!this.newPro)
      prod = this.productos.find(p => p == this.form.get('producto').value)
    else
      prod = {
        nombre: this.form.get('nombreProducto').value,
        descripcion: this.form.get('descProducto').value,
        codigoExterno: this.form.get('codExtProducto').value
      }

    if (!this.newCho)
      cho = this.choferes.find(c => c == this.form.get('chofer').value)
    else
      cho = {
        nombre: this.form.get('nombreChofer').value,
        apellido: this.form.get('apellidoChofer').value,
        dni: this.form.get('dniChofer').value,
        codigoExterno: this.form.get('codExtChofer').value
      }

    if (!this.newCam)
      cam = this.camiones.find(c => c == this.form.get('camion').value)
    else
      cam = {
        cisternado: this.form.get('cisterCamion').value,
        codigoExterno: this.form.get('codExtCamion').value,
        patente: this.form.get('patenteCamion').value,
        descripcion: this.form.get('descCamion').value
      }

    if (!this.newCli)
      cli = this.clientes.find(c => c == this.form.get('cliente').value)
    else
      cli = {
        razonSocial: this.form.get('razSocCliente').value,
        codigoExterno: this.form.get('codExtCliente').value,
        contacto: this.form.get('contCliente').value
      }

    var or: OrdenDeCarga = {
      producto: prod,
      chofer: cho,
      camion: cam,
      cliente: cli,
      codigoExterno: this.form.get('codExt').value,
      numeroOrden: this.form.get('numOrden').value,
      fechaHoraTurno: this.form.get('fecHoraTurno').value,
      preset: this.form.get('preset').value
    }

    if (or.camion == null || or.chofer == null ||
      or.cliente == null || or.producto == null ||
      or.codigoExterno == null || or.numeroOrden == null ||
      or.fechaHoraTurno == null || or.preset == null) {
      Swal.fire({
        title: 'Error',
        text: 'Faltan datos por completar',
        icon: 'error'
      });
      return;
    }

    this.apiOrdenes.crearOrdenCargaUsingPOST(or).subscribe((resp: any) => {
      console.log(resp)
      Swal.fire({
        title: 'Orden de carga creada',
        text: 'La orden de carga se creó correctamente',
        icon: 'success'
      }).then(() => {
        this.router.navigate(['/ordenes']);
      })
    }, (err: any) => {
      Swal.fire({
        title: 'Error',
        text: err.error.message,
        icon: 'error'
      }).then(() => {
        this.router.navigate(['/']);
      })
    })


  }


}
