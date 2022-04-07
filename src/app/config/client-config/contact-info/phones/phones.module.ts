import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPhoneComponent } from './edit-phone/edit-phone.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { NotificationModule } from '@availa/notification';
import { PhonesComponent } from './phones.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [PhonesComponent, EditPhoneComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    NotificationModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
  ],
  exports: [PhonesComponent, EditPhoneComponent],
})
export class PhonesModule {}
