import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreetViewComponent } from './view.component';
import { HttpClientJsonpModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
    declarations: [StreetViewComponent],
    imports: [CommonModule, GoogleMapsModule, HttpClientJsonpModule],
    exports: [StreetViewComponent],
})
export class StreetViewModule {}
