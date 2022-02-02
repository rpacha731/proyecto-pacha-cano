import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrearOrdenRequest } from './classes/crear-orden-request';
import { LocalService } from './local-service.service';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  urlEndpoint: string

  constructor(private http: HttpClient,
              private ls: LocalService) {
    this.urlEndpoint = `${environment.urls.API_BASE_URL}`;
  }

  crearOrden (ordenNueva: CrearOrdenRequest) {
    let token = this.ls.getJsonValue('authToken');
    return this.http.post(`${this.urlEndpoint}/ordenes-carga`, ordenNueva, { params : {"token" : token} })
  }





}
