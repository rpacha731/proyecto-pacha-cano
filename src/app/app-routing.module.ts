import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargaDatosComponent } from './carga-datos/carga-datos.component';
import { CrearOrdenComponent } from './crear-orden/crear-orden.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [ 
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'crear-orden', component: CrearOrdenComponent },
  { path: 'carga', component: CargaDatosComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
