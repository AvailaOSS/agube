import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MapModule } from 'src/app/components/map/map/map.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogOnlyMapComponent } from './dialog-only-map.component';

@NgModule({
    declarations: [DialogOnlyMapComponent],
    exports: [DialogOnlyMapComponent],
    imports: [CommonModule, MapModule, MatButtonModule, MatTooltipModule, TranslateModule],
})
export class DialogOnlyMapModule {}
