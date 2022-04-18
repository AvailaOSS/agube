import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { PipesModule } from '../../../pipes/pipes.module';
import { FullAddressPipe } from 'src/app/pipes/full-address.pipe';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    PipesModule,
    MatListModule,
    MatIconModule,
  ],
  exports: [CreateComponent],
  providers: [FullAddressPipe],
})
export class CreateModule {}
