import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { CargaDatosComponent } from './carga-datos/carga-datos.component';
import { CrearOrdenComponent } from './crear-orden/crear-orden.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [ 
  { path: 'home', component: HomeComponent, canActivate: [UserGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'crear-orden', component: CrearOrdenComponent, canActivate: [AdminGuard] },
  { path: 'admin-users', component: AdminUsersComponent },
  { path: 'ordenes', component: OrdenesComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'carga/:id', component: CargaDatosComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
