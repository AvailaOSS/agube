import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { PipesModule } from '../../../pipes/pipes.module';
import { FullAddressPipe } from 'src/app/pipes/full-address.pipe';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    PipesModule,
    MatListModule,
  ],
  exports: [CreateComponent],
  providers: [FullAddressPipe],
})
export class CreateModule {}
