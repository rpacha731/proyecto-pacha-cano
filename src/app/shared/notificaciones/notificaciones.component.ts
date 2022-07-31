import { Component, OnInit } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { NotificacionesControllerService } from 'src/app/client';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { LocalService } from '../services/local-service.service';
import { Notificacion } from './notificacion';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  notificaciones: Notificacion[] = [];
  private urlWS: string;
  cliente: CompatClient;
  stompClient: any;

  constructor(private notifServ: NotificacionesControllerService, private as: AuthService) { 
    this.urlWS = `http://localhost:8080/websocket-pc`;
  }

  ngOnInit() {
    
    const ws = new SockJS(this.urlWS + '?token=' + this.as.getJwt());
    this.cliente = Stomp.over(ws);
    this.cliente.debug = () => {}
    const _this = this;
    console.log(this.as.getEmailUser());
    this.cliente.connect({}, function (frame: any) {

      _this.cliente.subscribe('/queue/' + _this.as.getEmailUser() + '/private-notifications', (message: { body: string; }) => {
        console.log(message);
        if (message.body) {
          _this.notificaciones.push(JSON.parse(message.body));
        }
      });
    });
  }

  contarNotificaciones() {
    return this.notificaciones.length;
  }

}
