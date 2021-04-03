import { UtilsModule } from '../../../../../dwelling/dwelling-detail-card/management-components/dWellingUtils/utils.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewContactComponent } from './add-new-contact.component';



@NgModule({
  declarations: [AddNewContactComponent],
  imports: [
    CommonModule,
    UtilsModule
  ]
})
export class AddNewContactModule { }
