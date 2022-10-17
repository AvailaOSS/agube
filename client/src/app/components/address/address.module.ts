import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address.component';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
    declarations: [AddressComponent],
    imports: [CommonModule, TranslateModule, PipesModule],
    exports: [AddressComponent],
})
export class AddressModule {}
