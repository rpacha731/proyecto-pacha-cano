import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-carga-datos',
  templateUrl: './carga-datos.component.html',
  styleUrls: ['./carga-datos.component.scss']
})
export class CargaDatosComponent implements OnInit {

  linesR : any[] = []
  lineaActual: any[] = ["-", "-", "-", "-"]
  index: number = 0;
  frecuenciaMues : number = 1000
  cancelar : boolean = false
  habilitado: boolean = true
  habilitadoCar: boolean = true

  formDatosInicial: FormGroup

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }


  po(fileInput: Event) {

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

    this.habilitadoCar = false
    console.log(this.linesR)
  }

  carga () {
    this.habilitadoCar = true
    this.habilitado = false
    window.setInterval(() => {
      if (!this.cancelar && this.index < this.linesR.length) {
        console.log(this.index)
        this.lineaActual = this.linesR[this.index];
        this.index++;
      }
    }, this.frecuenciaMues);
  }

  


}
