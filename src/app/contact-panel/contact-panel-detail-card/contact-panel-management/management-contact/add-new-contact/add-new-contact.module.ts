import { UtilsModule } from './../../../../../dwelling/dwelling-detail-card/management-components/utils/utils.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewContactComponent } from './add-new-contact.component';
import { ToolbarModule } from '../../../../../menu/toolbar.module';



@NgModule({
  declarations: [AddNewContactComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    UtilsModule
  ]
})
export class AddNewContactModule { }
