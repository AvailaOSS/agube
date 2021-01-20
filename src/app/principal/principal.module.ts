import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { MenuModule } from '../menu/menu.module';



@NgModule({
  declarations: [PrincipalComponent],
  imports: [
    CommonModule,
    MenuModule
  ],
  exports: [
    PrincipalComponent
],
})
export class PrincipalModule { }
