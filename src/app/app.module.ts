import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CargaDatosComponent } from './carga-datos/carga-datos.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CargaDatosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
