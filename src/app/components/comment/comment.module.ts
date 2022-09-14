import { NotificationModule } from '@availa/notification';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { ListComponent } from './list/list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreatedialogComponent } from './createdialog/createdialog.component';
import { EditdialogComponent } from './editdialog/editdialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [ListComponent, CreatedialogComponent, EditdialogComponent],
    imports: [
        TranslateModule,
        CommonModule,
        MatListModule,
        MatCardModule,
        MatTooltipModule,
        MatIconModule,
        MatButtonModule,
        NotificationModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    exports: [ListComponent],
})
export class CommentModule {}
