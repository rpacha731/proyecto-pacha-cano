import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CdTimerComponent } from 'angular-cd-timer';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Configuration, OrdenCargaControllerService, OrdenDeCarga } from '../client';
import { RequestDelPesoFinal } from '../client/model/requestDelPesoFinal';
import { RequestDelPesoInicial } from '../client/model/requestDelPesoInicial';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-carga-datos',
  templateUrl: './carga-datos.component.html',
  styleUrls: ['./carga-datos.component.scss']
})
export class CargaDatosComponent implements OnInit {

  @ViewChild('childModal', { static: false }) childModal?: ModalDirective;
  @ViewChild('timer') timer?: CdTimerComponent;

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
  formPesoF: FormGroup;
  passw: number;
  habilitado: boolean = false
  habilitado2: boolean = true
  habilitado3: boolean = true
  siCarga: boolean = false
  habilitado4: boolean = true
  habilitado5: boolean = true
  habilitado6: boolean = true
  err: boolean = false
  intervalId: any;

  conciliacion: any = {};

  tiempoEstimado: string = "Sin datos"

  max: number = 100;
  actual: number = 0;

  constructor(private ap: ActivatedRoute,
    private api: OrdenCargaControllerService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {
    let config = new Configuration();
    config.accessToken = this.authService.getJwt();
    this.api.configuration = config;
  }

  ngOnInit(): void {
    let config = new Configuration();
    config.accessToken = this.authService.getJwt();
    this.api.configuration = config;
    this.ap.params.subscribe(resp => {
      this.numeroOrden = resp.id;
    })
    this.getOrden();
    this.createForm();
  }

  getOrden() {
    this.api.loadByNumOrdenUsingGET(this.numeroOrden).subscribe((resp: any) => {
      this.orden = resp;
      this.max = this.orden.preset;
      this.conciliacion = this.orden;
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
    this.formPesoF = this.fb.group({
      pesoFinal: ['', Validators.required]
    })
  }

  get passwordInvalida() {
    return this.formPass.get('password').invalid && this.formPass.get('password').touched;
  }

  get pesoFinalInvalido() {
    return this.formPesoF.get('pesoFinal').invalid && this.formPesoF.get('pesoFinal').touched;
  }

  adjuPassw() {
    this.passw = this.formPass.get('password').value;
    if (this.passw == this.orden.password) {
      this.modalRef.hide();
      Swal.fire({
        title: 'Password correcta',
        text: 'Se procede a adjuntar el peso inicial',
        icon: 'success',
      }).then((result) => {
        if (result.isConfirmed) {
          this.habilitado = true;
          this.habilitado2 = false;
        }
      })
    } else {
      this.formPass.markAllAsTouched();
      this.err = true;
    }
  }

  openModalPeso(template: TemplateRef<any>) {
    this.subscriptions.push(
      this.modalService.onHide.subscribe(() => {
        this.unsubscribe();
      })
    );
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  // adjuntarPesoInicial() {

  //   if (this.formPeso.invalid)
  //     return this.formPeso.markAllAsTouched();

  //     this.habilitado2 = true;
  //         this.habilitado3 = false;
  //         this.modalRef.hide();

  //   // var pesoIncialReq: RequestDelPesoInicial = {
  //   //   numeroOrden: this.numeroOrden,
  //   //   pesoInicial: this.formPeso.get('pesoInicial').value
  //   // }

  //   // this.api.adjuntarTaraUsingPUT(pesoIncialReq).subscribe((resp: any) => {
  //   //   Swal.fire({
  //   //     title: 'Peso inicial adjuntado',
  //   //     text: 'Se procede a cargar combustible',
  //   //     icon: 'success',
  //   //   }).then((result) => {
  //   //     this.habilitado2 = true;
  //   //     this.habilitado3 = false;
  //   //     this.modalRef.hide();
  //   //   })
  //   // }, err => {
  //   //   console.log(err)
  //   //   Swal.fire({
  //   //     title: 'Error',
  //   //     text: 'No se pudo adjuntar el peso inicial',
  //   //     icon: 'error',
  //   //   })
  //   // })

  // }

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

    this.habilitado2 = true;
    this.habilitado3 = false
    console.log(this.linesR)
  }

  carga() {
    this.habilitado3 = true
    this.habilitado4 = false
    this.timer.start();
    this.siCarga = true
    this.api.cambiarFrecuenciaUsingPUT(this.frecuenciaMues, this.numeroOrden).subscribe((resp: any) => {
      console.log(resp)
    }, err => {
      console.log(err)
    }
    )
    this.startIntervalo()
  }

  startIntervalo() {
    if (this.habilitado3 == true && this.siCarga)
      this.intervalId = setInterval(() => {
        if (!this.cancelar && this.index < this.linesR.length) {
          console.log(this.index)
          console.log(this.max + " - " + this.actual)
          this.lineaActual = this.linesR[this.index];
          this.actual = Math.floor(this.lineaActual[0]);

          //lineaActual = ["-", "-", "-", "-"] masa - densidad - temperatura - caudal

          this.api.adjuntarDatoCargaUsingPUT(this.lineaActual[3], this.lineaActual[1], this.lineaActual[0],
            this.numeroOrden, this.orden.password, this.lineaActual[2]).subscribe((resp: any) => {
              console.log(resp.estado)
              this.tiempoEstimado = resp.estado;
            }, err => {
              console.log(err)
              if (err.error.code == 409)
                this.cancelar = true;
                this.habilitado4 = true;
                this.habilitado5 = false;
                this.timer.stop();
                clearInterval(this.intervalId);
                return

            }
            )
          this.index++;
        }
      }, 250);
  }

  intervalo() {
    this.api.cambiarFrecuenciaUsingPUT(this.frecuenciaMues, this.numeroOrden).subscribe((resp: any) => {
      console.log(resp)
    }, err => {
      console.log(err)
    }
    )
    // clearInterval(this.intervalId);
    // if (this.habilitado3 == true && this.siCarga)
    //   this.startIntervalo();
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
    this.cancelar = true;

    this.api.cerrarOrdenUsingPOST(this.numeroOrden).subscribe((resp: any) => {
      this.habilitado4 = true;
      this.habilitado5 = false;
      this.timer.stop();
      this.tiempoEstimado = "Sin datos";
      Swal.fire({
        title: 'Orden cerrada',
        html: 'La orden de carga número: <strong>' + this.numeroOrden + '</strong> se ha cerrado correctamente',
        icon: 'success',
      })
    }, err => {
      this.habilitado4 = true;
      this.habilitado5 = false;
      console.log(err)
      Swal.fire({
        title: 'Error',
        html: 'No se ha podido cerrar la orden de carga número: <strong>' + this.numeroOrden + '</strong>',
        icon: 'error',
      })
    })
  }

  openModalPesoFinal(template: TemplateRef<any>) {
    this.subscriptions.push(
      this.modalService.onHide.subscribe(() => {
        this.unsubscribe();
      })
    );
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  adjuntarPesoF() {

    if (this.formPesoF.invalid)
      return this.formPesoF.markAllAsTouched();

    var pesoFinalReq: RequestDelPesoFinal = {
      numeroOrden: this.numeroOrden,
      pesoFinal: this.formPesoF.get('pesoFinal').value
    }

    this.api.adjuntarPesoFinalUsingPUT(pesoFinalReq).subscribe(resp => {
      console.log(resp)
      this.conciliacion = resp;
      Swal.fire({
        title: 'Peso final adjuntado',
        html: 'El peso final de la orden de carga número: <strong>' + this.numeroOrden +
          '</strong> se ha adjuntado correctamente, Quiere ver la conciliación de la orden?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, ver conciliación'
      }).then((result) => {
        if (result.isConfirmed) {
          this.modalRef.hide();
          this.childModal?.show();
        }
      }
      )
    }, err => {
      console.log(err)
      Swal.fire({
        title: 'Error',
        html: 'No se ha podido adjuntar el peso final de la orden de carga número: <strong>' + this.numeroOrden + '</strong>',
        icon: 'error',
      })
    }
    )
  }

  navigate() {
    this.router.navigate(['/ordenes']);
  }

}
