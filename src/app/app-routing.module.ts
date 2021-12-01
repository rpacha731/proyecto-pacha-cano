import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargaDatosComponent } from './carga-datos/carga-datos.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [ 
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'carga', component: CargaDatosComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
