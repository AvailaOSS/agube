import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { NotificationModule } from '@availa/notification';
import { PhonesComponent } from './phones.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [PhonesComponent, EditComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        NotificationModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatListModule,
        MatTooltipModule,
        TranslateModule,
    ],
    exports: [PhonesComponent, EditComponent],
})
export class PhonesModule {}
