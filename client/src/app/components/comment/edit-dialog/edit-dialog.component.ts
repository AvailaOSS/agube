import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentsService } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { CommentManager } from '../comment.manager';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { CommentCreate } from '../type';

@Component({
  selector: 'app-edit-comment-dialog',
  styleUrls: ['../create-dialog/create-dialog.component.scss'],
  templateUrl: '../create-dialog/create-dialog.component.html',
})
export class EditDialogComponent extends CreateDialogComponent {
  constructor(
    private svcComment: CommentsService,
    protected override managerComment: CommentManager,
    protected override svcNotification: NotificationService,
    protected override dialogRef: MatDialogRef<CreateDialogComponent>,
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
        error: (error) =>
          this.svcNotification.warning({
            message: error.error.status ? error.error.status : error.error.detail,
          }),
      });
  }
}
