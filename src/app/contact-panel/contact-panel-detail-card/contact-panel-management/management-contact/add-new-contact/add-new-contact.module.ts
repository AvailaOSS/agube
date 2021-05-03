import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewContactComponent } from './add-new-contact.component';
import { DwellingUtilsModule } from 'src/app/dwelling/dwelling-detail-card/management-detail-card/management-components/dwelling-utils/dwelling-utils.module';

@NgModule({
  declarations: [AddNewContactComponent],
  imports: [CommonModule, DwellingUtilsModule],
})
export class AddNewContactModule {}
