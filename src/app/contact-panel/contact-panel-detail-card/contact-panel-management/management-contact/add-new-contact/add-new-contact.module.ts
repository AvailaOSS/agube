import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewContactComponent } from './add-new-contact.component';
import { UtilsModule } from 'src/app/dwelling/dwelling-detail-card/management-detail-card/management-components/dwellingUtils/utils.module';

@NgModule({
  declarations: [AddNewContactComponent],
  imports: [CommonModule, UtilsModule],
})
export class AddNewContactModule {}
