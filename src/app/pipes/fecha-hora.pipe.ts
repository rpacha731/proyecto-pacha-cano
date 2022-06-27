import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechahora'
})
export class FechaHoraPipe implements PipeTransform {

  transform(fecha: any): string {
    return new Date(fecha).toLocaleDateString('es-ES', {day: '2-digit', month:'2-digit', year: '2-digit', 
                                                        hour: '2-digit', minute: '2-digit'})
  }

}
