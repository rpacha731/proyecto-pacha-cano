import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faIdCard, faSquarePollHorizontal, faTruck } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Configuration, OrdenCargaControllerService, OrdenDeCarga, RequestDelPesoInicial } from '../client';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {

  truck = faTruck;
  driver = faIdCard;
  result = faSquarePollHorizontal;
  ind: number;
  cadena: string;
  ordencita: OrdenDeCarga;

  formTara: FormGroup;
  modalRef?: BsModalRef;
  modalRef2?: BsModalRef;
  subscriptions: Subscription[] = [];

  totalItems: number;
  currentPage: number = 1;

  conciliacion: any = {}

  ordenes: OrdenDeCarga[] = []
  loading: boolean = false
  ordenesPagina: OrdenDeCarga[] = []
  ordenesPaginaAux: OrdenDeCarga[] = []

  constructor(
     private ordenesService: OrdenCargaControllerService,
     private authService: AuthService,
    private router: Router,
    private modalService: BsModalService,
    private fb: FormBuilder) { 
      let a = new Configuration();
    a.accessToken = this.authService.getJwt();
    a.withCredentials = true;
    console.log(a);
    this.ordenesService.configuration = a;
    

    }

  ngOnInit() {
    let a = new Configuration();
    a.accessToken = this.authService.getJwt();
    this.ordenesService.configuration = a;
    this.cargarOrdenes();
    this.createFormTara();
  }

  buscar() {
    console.log(this.cadena);
    if (this.cadena == '') {
      this.ordenesPaginaAux = this.ordenes;
      return;
    }
    this.ordenesPaginaAux = []
    this.ordenes.forEach(o => {
      if (o.numeroOrden.toString().includes(this.cadena) || o.codigoExterno.toLowerCase().includes(this.cadena))
        this.ordenesPaginaAux.push(o);
    })
    this.totalItems = this.ordenesPaginaAux.length
    console.log(this.ordenesPaginaAux);
  }

  createFormTara() {
    this.formTara = this.fb.group({
      pesoInicial: ['', Validators.required],
      temperatura: ['40', Validators.required]
    })
  }


  get pesoInicialInvalido() {
    return this.formTara.get('pesoInicial').invalid && this.formTara.get('pesoInicial').touched;
  }
  get temperaturaInvalida() {
    return this.formTara.get('temperatura').invalid && this.formTara.get('temperatura').touched;
  }

  cargarOrdenes() {
    console.log(this.ordenesService.configuration )
    this.ordenesService.listadoUsingGET().subscribe((resp: any) => {
      this.ordenes = resp
      this.totalItems = this.ordenes.length
      this.ordenesPaginaAux = this.ordenes.slice(0, 10);
      console.log(this.ordenes)
      console.log(this.ordenesPagina)
    })
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.ordenesPaginaAux = this.ordenes.slice(startItem, endItem);
  }

  enviarTara() {

    if (this.formTara.invalid)
      return this.formTara.markAllAsTouched();

    this.loading = true

    var pesoInicialReq: RequestDelPesoInicial = {
      numeroOrden: this.ordenesPaginaAux[this.ind].numeroOrden,
      pesoInicial: this.formTara.controls.pesoInicial.value,
      temperaturaUmbral: this.formTara.controls.temperatura.value
    }
    this.ordenesService.adjuntarTaraUsingPUT(pesoInicialReq).subscribe((resp: any) => {
      this.ordenesPaginaAux[this.ind] = resp
      Swal.fire({
        title: 'Peso inicial adjuntado',
        html: 'El peso inicial ha sido adjuntado correctamente, la PASSWORD para la carga de combustible es: <span class="text-danger">' + resp.password + 
        '</span>\n\n <span style="font-size: 10px;"> Recuerde que la PASSWORD es única para cada carga de combustible y no puede acceder a solicitar una nueva.</span>',
        icon: 'success'
      }).then(() => {
        this.modalRef.hide()
      } )
    }, (err: any) => {
      Swal.fire({
        title: 'Error',
        text: err.error.message,
        icon: 'error'
      })
    }
    )
  }

  cargarNafta(index: number) {
    this.router.navigate(['/carga', this.ordenesPaginaAux[index].numeroOrden])
  }


  detail(index: number) {
    this.ind = index;
    this.ordencita = this.ordenesPaginaAux[index];
  }

  openModal(template: TemplateRef<any>, index: number) {
    this.ind = index;
    this.subscriptions.push(
      this.modalService.onHide.subscribe(() => {
        this.unsubscribe();
      })
    );
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  };

  openDetails(template: TemplateRef<any>, index: number) {
    this.ind = index;
    this.ordencita = this.ordenesPaginaAux[index];
    this.subscriptions.push(
      this.modalService.onHide.subscribe(() => {
        this.unsubscribe();
      })
    );
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  };

  openConcil(template: TemplateRef<any>) {

    this.ordenesService.loadConciliacionUsingGET(this.ordencita.numeroOrden).subscribe((resp: any) => {
      this.conciliacion = resp
      console.log(this.conciliacion)
    }, err => {
      console.log(err)
    }
    )

    this.subscriptions.push(
      this.modalService.onHide.subscribe(() => {
        this.unsubscribe();
      })
    );
    this.modalRef.hide()
    this.modalRef2 = this.modalService.show(template, { class: 'modal-md' });
  }

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  filtrar (num: number) {
    if (num == 0) {
      this.ordenesPaginaAux = this.ordenes.slice(0, 10);
      this.totalItems = this.ordenes.length
    } else {
      this.ordenesPaginaAux = this.ordenes.filter(o => o.estado == 'E' + num)
      this.totalItems = this.ordenesPaginaAux.length
    }
    console.log(this.ordenesPaginaAux)
  }
}
