import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CargaDatosComponent } from './carga-datos/carga-datos.component';
import { RouterModule } from '@angular/router';
import { CrearOrdenComponent } from './crear-orden/crear-orden.component';
import { HomeComponent } from './home/home.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiModule } from './client';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PipesModule } from './pipes/pipes.module';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';


@NgModule({
  declarations: [	
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CargaDatosComponent,
    CrearOrdenComponent,
    HomeComponent,
    OrdenesComponent,
      AdminUsersComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    PipesModule,
    HttpClientModule,
    AppRoutingModule, 
    FontAwesomeModule,
    ApiModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
