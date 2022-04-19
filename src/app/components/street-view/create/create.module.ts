import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { PipesModule } from '../../../pipes/pipes.module';
import { FullAddressPipe } from 'src/app/pipes/full-address.pipe';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    PipesModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CreateComponent],
  providers: [FullAddressPipe],
})
export class CreateModule {}
