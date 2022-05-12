import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateModule } from '../map/create/create.module';

@NgModule({
    declarations: [DialogComponent],
    imports: [CommonModule, TranslateModule, MatTooltipModule, MatIconModule, CreateModule, MatButtonModule],
    exports: [DialogComponent],
})
export class DialogModule {}
