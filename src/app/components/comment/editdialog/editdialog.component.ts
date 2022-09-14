import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentsService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { CommentManager } from '../comment.manager';
import { CreatedialogComponent } from '../createdialog/createdialog.component';
import { CommentCreate } from '../type';

@Component({
    selector: 'app-editdialog',
    templateUrl: '../createdialog/createdialog.component.html',
    styleUrls: ['../createdialog/createdialog.component.scss'],
})
export class EditdialogComponent extends CreatedialogComponent {
    constructor(
        private svcComment: CommentsService,
        protected override managerComment: CommentManager,
        protected override svcNotification: NotificationService,
        protected override dialogRef: MatDialogRef<CreatedialogComponent>,
        @Inject(MAT_DIALOG_DATA) protected override data: CommentCreate
    ) {
        super(managerComment, svcNotification, dialogRef, data);
        this.message.setValue(data.message);
        if (this.data.created === undefined) {
            throw new Error('Date is required for this component');
        }
    }

    public override save(): void {
        // stop here if form is invalid
        if (this.message.invalid) {
            return;
        }

        this.svcComment
            .updateComment(this.data.id, {
                id: this.data.id,
                message: this.message.value,
                created: this.data.created!,
            })
            .subscribe({
                next: (value) => this.close(true),
                error: (error) => this.svcNotification.warning({ message: error.error.status ?  error.error.status : error.error.detail }),
            });
    }
}
