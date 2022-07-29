import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faIdCard, faSquarePollHorizontal, faTruck } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { OrdenCargaControllerService, OrdenDeCarga, RequestDelPesoInicial } from '../client';

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
  subscriptions: Subscription[] = [];

  totalItems: number;
  currentPage: number = 1;

  ordenes: OrdenDeCarga[] = []
  loading: boolean = false
  ordenesPagina: OrdenDeCarga[] = []

  constructor(private ordenesService: OrdenCargaControllerService,
    private router: Router,
    private modalService: BsModalService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.cargarOrdenes();
    this.createFormTara();
  }

  buscar() {
    console.log(this.cadena);
    var ordenesAux: OrdenDeCarga[] = [];
    this.ordenes.forEach(o => {
      if (o.numeroOrden.toString().includes(this.cadena) || o.codigoExterno.toLowerCase().includes(this.cadena))
        ordenesAux.push(o);
    })
    console.log(ordenesAux);
  }

  createFormTara() {
    this.formTara = this.fb.group({
      pesoInicial: ['', Validators.required]
    })
  }


  get pesoInicialInvalido() {
    return this.formTara.get('pesoInicial').invalid && this.formTara.get('pesoInicial').touched;
  }

  cargarOrdenes() {
    this.ordenesService.listadoUsingGET().subscribe((resp: any) => {
      this.ordenes = resp
      this.totalItems = this.ordenes.length
      this.ordenesPagina = this.ordenes.slice(0, 10)
      console.log(this.ordenes)
      console.log(this.ordenesPagina)
    })
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.ordenesPagina = this.ordenes.slice(startItem, endItem);
  }

  enviarTara() {

    if (this.formTara.invalid)
      return this.formTara.markAllAsTouched();

    this.loading = true

    var pesoInicialReq: RequestDelPesoInicial = {
      numeroOrden: this.ordenesPagina[this.ind].numeroOrden,
      pesoInicial: this.formTara.controls.pesoInicial.value
    }
    this.ordenesService.adjuntarTaraUsingPUT(pesoInicialReq).subscribe((resp: any) => {
      this.ordenesPagina[this.ind] = resp
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
    this.router.navigate(['/carga', this.ordenesPagina[index].numeroOrden])
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
    this.ordencita = this.ordenesPagina[index];
    this.subscriptions.push(
      this.modalService.onHide.subscribe(() => {
        this.unsubscribe();
      })
    );
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  };

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

}
