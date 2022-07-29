import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { OrdenCargaControllerService, OrdenDeCarga } from '../client';
import { RequestDelPesoFinal } from '../client/model/requestDelPesoFinal';

@Component({
  selector: 'app-carga-datos',
  templateUrl: './carga-datos.component.html',
  styleUrls: ['./carga-datos.component.scss']
})
export class CargaDatosComponent implements OnInit {

  linesR: any[] = []
  lineaActual: any[] = ["-", "-", "-", "-"]
  index: number = 0;
  numeroOrden: number = 0;
  frecuenciaMues: number = 1000
  cancelar: boolean = false


  modalRef?: BsModalRef;
  subscriptions: Subscription[] = [];

  orden: OrdenDeCarga;
  formPass: FormGroup;
  passw: number;
  habilitado: boolean = false
  err: boolean = false

  habilitadoCarga: boolean = true

  constructor(private ap: ActivatedRoute,
    private api: OrdenCargaControllerService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.ap.params.subscribe(resp => {
      this.numeroOrden = resp.id;
    })
    this.getOrden();
    this.createForm();
  }

  getOrden() {
    this.api.loadByNumOrdenUsingGET(this.numeroOrden).subscribe((resp: any) => {
      this.orden = resp;
      console.log(resp)
    }, err => {
      console.log(err)
      Swal.fire({
        title: 'Error',
        html: 'No existe la orden de carga número: <strong>' + this.numeroOrden + '</strong>',
        icon: 'error'
      }).then(() => {
        this.router.navigate(['/home']);
      })
    })
  }

  createForm() {
    this.formPass = this.fb.group({
      password: ['', Validators.required]
    })
  }

  get passwordInvalida() {
    return this.formPass.get('password').invalid && this.formPass.get('password').touched;
  }

  adjuPassw() {
    this.passw = this.formPass.get('password').value;
    if (this.passw == this.orden.password) {
      this.modalRef.hide();
      Swal.fire({
        title: 'Password correcta',
        text: 'Se procede a cargar combustible',
        icon: 'success',
      }).then((result) => {
        if (result.value) {
          this.habilitado = true;
          this.habilitadoCarga = false;
        }
      })
    } else {
      this.formPass.markAllAsTouched();
      this.err = true;
    }
  }

  csv(fileInput: Event) {

    let file = (<HTMLInputElement>fileInput.target).files?.item(0)

    let fileReader = new FileReader()
    fileReader.readAsText(file!)

    fileReader.onload = (e) => {
      let csv: any = fileReader.result;
      let allTextLines = [];
      allTextLines = csv.split(/\r\n/);

      let arrl = allTextLines.length;
      let rows = [];
      for (let i = 1; i < arrl; i++) {
        rows.push(allTextLines[i].split(','));
      }
      this.linesR = rows;
    }

    this.habilitadoCarga = false
    console.log(this.linesR)
  }

  carga() {
    this.habilitadoCarga = true
    this.habilitado = false
    window.setInterval(() => {
      if (!this.cancelar && this.index < this.linesR.length) {
        console.log(this.index)
        this.lineaActual = this.linesR[this.index];
        this.index++;
      }
    }, this.frecuenciaMues);
  }


  openModalPassw(template: TemplateRef<any>) {
    this.subscriptions.push(
      this.modalService.onHide.subscribe(() => {
        this.unsubscribe();
      })
    );
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  cerrarOrden() {
    this.cancelar = true; this.habilitado = true; 
    let request: RequestDelPesoFinal = {
      numeroOrden: this.numeroOrden,
      pesoFinal: this.orden.pesoFinal
    } 
    this.api.adjuntarPesoFinalUsingPUT(request).subscribe(resp => {
      console.log(resp)
    }
    , err => {
      console.log(err)
    }
    )
  }

}
