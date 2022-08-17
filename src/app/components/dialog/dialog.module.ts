import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditModule } from '../map/edit/edit.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [DialogComponent],
    imports: [
        CommonModule,
        TranslateModule,
        MatTooltipModule,
        MatIconModule,
        EditModule,
        MatButtonModule,
        MatCardModule,
    ],
    exports: [DialogComponent],
})
export class DialogModule {}
