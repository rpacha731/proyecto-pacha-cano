export * from './adminController.service';
import { AdminControllerService } from './adminController.service';
export * from './authController.service';
import { AuthControllerService } from './authController.service';
export * from './basicErrorController.service';
import { BasicErrorControllerService } from './basicErrorController.service';
export * from './ordenCargaController.service';
import { OrdenCargaControllerService } from './ordenCargaController.service';
export const APIS = [AdminControllerService, AuthControllerService, BasicErrorControllerService, OrdenCargaControllerService];
