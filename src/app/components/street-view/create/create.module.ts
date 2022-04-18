import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { HttpClientJsonpModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [CreateComponent],
  imports: [CommonModule, GoogleMapsModule, HttpClientJsonpModule],
  exports: [CreateComponent],
})
export class CreateModule {}
