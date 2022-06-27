import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FechaHoraPipe } from './fecha-hora.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FechaHoraPipe],
  exports: [FechaHoraPipe]
})
export class PipesModule { }
