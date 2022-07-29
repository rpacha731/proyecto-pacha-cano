import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthControllerService } from '../client';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService,
    private authServiceREST: AuthControllerService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    let token = this.authService.getJwt();

    if (!token) {
      this.router.navigate(['/login'])
      return false;
    };

    return this.authServiceREST.authInfoUsingGET(token).pipe(
      map((resp: any) => {

        for (let i = 0; i < resp.roles.length; i++) {
          if (resp.roles[i].nombre === 'ROLE_USER') {
            return true;
          }
        }
        this.router.navigate(['/home']);
        // this.authService.clearData();
        return false;
      }
      )
    );

  }

}
