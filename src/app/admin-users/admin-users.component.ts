import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminControllerService, Configuration, RequestDeCambioDeRol, Rol } from '../client';
import { User } from '../client/model/user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  form: FormGroup;
  modalRef?: BsModalRef;
  subscriptions: Subscription[] = [];
  users: User[] = [];
  user: User;
  indiceAux: number;
  roles: Rol[] = [];

  constructor(private fb: FormBuilder,
    private modalService: BsModalService,
    private authService: AuthService,
    private userAdmin: AdminControllerService) { 
      let config = new Configuration();
    config.accessToken = this.authService.getJwt();
    this.userAdmin.configuration = config;
    }

  ngOnInit() {
    let config = new Configuration();
    config.accessToken = this.authService.getJwt();
    this.userAdmin.configuration = config;
    this.getUsers();
    this.getRoles();
  }

  createForm() {
    const group = this.fb.group([]);
    this.roles.forEach(rol => {
      group.addControl(rol.nombre, this.fb.group({
        seleccionado: [JSON.stringify(this.user.roles).includes(JSON.stringify(rol))]
      }))
    });
    return group;
  }

  getUsers() {
    this.userAdmin.listarUsuariosUsingGET().subscribe((resp: any) => {
      this.users = resp;
    }, err => {
      console.log(err)
    });
  }

  getRoles() {
    this.userAdmin.listarRolesUsingGET().subscribe((resp: any) => {
      this.roles = resp;
    }, err => {
      console.log(err)
    });
  }

  actDesac(ind: number) {
    this.userAdmin.enableUserUsingPUT(this.users[ind].id).subscribe((resp: any) => {
      this.users[ind] = resp;
    }, err => {
      console.log(err)
    });
  }

  openModal(template: TemplateRef<any>, index: number) {
    this.user = this.users[index]
    this.indiceAux = index;
    this.form = this.createForm();
    this.subscriptions.push(
      this.modalService.onHide.subscribe(() => {
        this.unsubscribe();
      })
    );
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  };

  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  check(i: number) {
    return JSON.stringify(this.user.roles).includes(JSON.stringify(this.roles[i]))
  }

  cambiarRoles() {
    var req: RequestDeCambioDeRol = {
      idUser: this.user.id,
      roles: []
    }

    Object.keys(this.form.controls).forEach(key => {
      if (this.form.value[key].seleccionado) {
        req.roles.push(this.roles.find(rol => rol.nombre === key));
      }
    });

    this.userAdmin.changeRoleUsingPUT(req).subscribe((resp: any) => {
      this.users[this.indiceAux] = resp;
      this.user = resp;
      this.modalRef.hide();
    }, err => {
      console.log(err)
    });

  }

}
