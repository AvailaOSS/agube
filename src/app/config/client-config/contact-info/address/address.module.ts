import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { NotificationModule } from '@availa/notification';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { AddressComponent } from './address.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AddressComponent, EditAddressComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    NotificationModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    PipesModule,
    MatDividerModule,
    MatTooltipModule,
    TranslateModule
  ],
  exports: [AddressComponent, EditAddressComponent],
})
export class AddressModule {}
