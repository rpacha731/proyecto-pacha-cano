import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camion, Chofer, Cliente, CrearOrdenRequest, Producto } from '../shared/services/classes/crear-orden-request';
import { OrdenesService } from '../shared/services/ordenes.service';



@Component({
  selector: 'app-crear-orden',
  templateUrl: './crear-orden.component.html',
  styleUrls: ['./crear-orden.component.scss']
})
export class CrearOrdenComponent implements OnInit {

  form: FormGroup
  crearOrdenRequest: CrearOrdenRequest

  constructor(private fb: FormBuilder, private ordService : OrdenesService) {
    this.crearOrdenRequest = new CrearOrdenRequest()
  }

  ngOnInit() {
    this.crearForm();
  }

  crearForm() {
    this.form = this.fb.group({
      numOrden: ['', Validators.required],
      codExt: ['', Validators.required],
      nombreProducto: ['', Validators.required],
      descProducto: ['', Validators.required],
      codExtProducto: ['', [Validators.required]],
      cisterCamion: ['', Validators.required],
      codExtCamion: ['', Validators.required],
      patenteCamion: ['', Validators.required],
      descCamion: ['', Validators.required],
      fecHoraTurno: ['', Validators.required],
      preset: ['', Validators.required],
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

  crear() {
    if (this.form.invalid)
      return this.form.markAllAsTouched();

    var producto = new Producto(this.form.controls.nombreProducto.value,
      this.form.controls.codExtProducto.value,
      this.form.controls.descProducto.value)
    
    var chofer = new Chofer(this.form.controls.nombreChofer.value,
      this.form.controls.apellidoChofer.value,
      this.form.controls.dniChofer.value,
      this.form.controls.codExtChofer.value)
    
    var cliente = new Cliente(this.form.controls.contCliente.value,
      this.form.controls.razSocCliente.value,
      this.form.controls.codExtCliente.value)
    
    var camion = new Camion(this.form.controls.cisterCamion.value, 
      this.form.controls.descCamion.value,
      this.form.controls.codExtCamion.value,
      this.form.controls.patenteCamion.value)

    this.crearOrdenRequest.camion = camion
    this.crearOrdenRequest.chofer = chofer
    this.crearOrdenRequest.cliente = cliente
    this.crearOrdenRequest.producto = producto
    this.crearOrdenRequest.codigoExterno = this.form.controls.codExt.value
    this.crearOrdenRequest.numeroOrden = this.form.controls.numOrden.value
    this.crearOrdenRequest.fechaHoraTurno = this.form.controls.fecHoraTurno.value
    this.crearOrdenRequest.preset = this.form.controls.preset.value

    console.log(this.crearOrdenRequest)
  
    this.ordService.crearOrden(this.crearOrdenRequest).subscribe((resp: any) => {

      console.log(resp)

    }, (error: any) => {
      console.log(error)
    }

    )

  }


}
