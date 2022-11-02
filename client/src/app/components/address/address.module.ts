import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address.component';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
    declarations: [AddressComponent],
    exports: [AddressComponent],
    imports: [CommonModule, TranslateModule, PipesModule],
})
export class AddressModule {}
