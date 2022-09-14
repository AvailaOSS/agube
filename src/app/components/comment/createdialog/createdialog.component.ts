import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '@availa/notification';
import { CommentManager } from '../comment.manager';
import { CommentConfig } from '../type';

@Component({
    selector: 'app-createdialog',
    templateUrl: './createdialog.component.html',
    styleUrls: ['./createdialog.component.scss'],
})
export class CreatedialogComponent {
    public message = new FormControl('', [Validators.required]);

    constructor(
        protected managerComment: CommentManager,
        protected svcNotification: NotificationService,
        protected dialogRef: MatDialogRef<CreatedialogComponent>,
        @Inject(MAT_DIALOG_DATA) protected data: CommentConfig
    ) {}

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
                next: (value) => this.close(true),
                error: (error) => this.svcNotification.warning({ message: error.error.status }),
            });
    }

    public close(reload: boolean): void {
        this.dialogRef.close(reload);
    }

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
