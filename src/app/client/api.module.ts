import { NgModule, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AdminControllerService } from './api/adminController.service';
import { AuthControllerService } from './api/authController.service';
import { BasicErrorControllerService } from './api/basicErrorController.service';
import { NotificacionesControllerService } from './api/notificacionesController.service';
import { OrdenCargaControllerService } from './api/ordenCargaController.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AdminControllerService,
    AuthControllerService,
    BasicErrorControllerService,
    NotificacionesControllerService,
    OrdenCargaControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
