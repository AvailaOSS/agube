import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { CommentManager } from '../comment.manager';
import { CommentConfig } from '../type';

@Component({
    selector: 'app-create-comment-dialog',
    styleUrls: ['./create-dialog.component.scss'],
    templateUrl: './create-dialog.component.html',
})
export class CreateDialogComponent {
    // textarea variable in form
    public message = new FormControl('', [Validators.required]);

    // verification  textarea length
    public messageLength: Number = 0;
    public loadMessageLength = false;
    public allowedMessageLength: Number = 58;

    constructor(
        protected managerComment: CommentManager,
        protected svcNotification: NotificationService,
        protected dialogRef: MatDialogRef<CreateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) protected data: CommentConfig
    ) {}

    // verification changes in textarea
    changes(changes: string): void {
        this.loadMessageLength = true;
        this.messageLength = changes.length;
    }

    public save(): void {
        // stop here if form is invalid
        if (this.message.invalid) {
            return;
        }

        this.managerComment
            .create({
                id: this.data.id,
                type: this.data.type,
                message: this.message.value,
            })
            .subscribe({
                next: () => this.close(true),
                error: (error) => this.svcNotification.warning({ message: error.error.status }),
            });
    }

    // close dialog
    public close(reload: boolean): void {
        this.dialogRef.close(reload);
    }

    // validator if have any error in textarea
    public errorValidator(entity: string) {
        switch (entity) {
            case 'message':
                if (this.message.hasError('required')) {
                    return 'COMPONENTS.COMMENT.CREATE.VALIDATION.REQUIRED';
                }
                return '';
            default:
                return '';
        }
    }
}
