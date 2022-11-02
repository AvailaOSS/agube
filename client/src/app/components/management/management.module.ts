import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './management.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [ManagementComponent],
    exports: [ManagementComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, TranslateModule],
})
export class ManagementModule {}
