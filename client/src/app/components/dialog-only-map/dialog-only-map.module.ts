import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MapModule } from 'src/app/components/map/map/map.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogOnlyMapComponent } from './dialog-only-map.component';

@NgModule({
    declarations: [DialogOnlyMapComponent],
    imports: [CommonModule, MapModule, MatButtonModule, TranslateModule, MatTooltipModule],
    exports: [DialogOnlyMapComponent],
})
export class DialogOnlyMapModule {}
