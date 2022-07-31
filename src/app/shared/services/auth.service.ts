import { EventEmitter, Injectable, Output } from '@angular/core';
import { LocalService } from './local-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
 * Estos event emmiters nos serviran para notificar a todos los subscriptores que se realizaron cambios
 * cada vez que alguien se loguee, o desloguee.
 */
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() useremail: EventEmitter<string> = new EventEmitter();

  constructor(private ls: LocalService) { };

  getJwt(): string {
    return this.ls.getJsonValue('authToken');
  }

  getEmailUser(): string {
    return this.ls.getJsonValue('username');
  }

  isLoggedIn(): boolean {
    return this.getJwt() != null;
  }

  hasRole(role: string) {
    let roles = this.ls.getJsonValue('roles');
    for (let i = 0; i < roles.length; i++) 
      if (roles[i].nombre === role) 
        return true;
  }

  clearData() {
    this.ls.clearToken();

  }

  setData(response: any) {
    console.log(response);
    this.ls.setJsonValue('authToken', response.tokenEncript);
    this.ls.setJsonValue("username", response.username);
    this.ls.setJsonValue("roles", response.roles);
    this.ls.setJsonValue("expiraEn", response.expiraEn);

    this.emitUserAndLogged(response.username);
  }

  emitUserAndLogged(userEmail: string): void {
    this.loggedIn.emit(true);
    this.useremail.emit(userEmail);
  }

}
