import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  modalRef?: BsModalRef;
  subscriptions: Subscription[] = [];
  form: FormGroup;

  constructor(private authService: AuthService,
    private modalService: BsModalService,
    private router: Router) {
    this.form = new FormGroup({
      numOrden: new FormControl('', Validators.required)
    });
  }

  get numberInvalido() {
    return this.form.get('numOrden').invalid && this.form.get('numOrden').touched;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  openModal(template: TemplateRef<any>) {
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

  goToCargaDatos() {
    let numOrden = this.form.get('numOrden').value;
    this.modalRef.hide();
    this.router.navigate(['/carga', numOrden]);
  }
}
