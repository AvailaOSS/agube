import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comment, CommentsService, ManagerService } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { CommentManager } from '../comment.manager';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { CommentConfig, CommentCreate } from '../type';

@Component({
    selector: 'app-comment-list',
    styleUrls: ['./list.component.scss'],
    templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
    @Input() public config: CommentConfig | undefined;
    public loadingComments: boolean = false;
    public comments: Comment[] = [];

    constructor(
        private svcComments: CommentsService,
        private managerComment: CommentManager,
        private svcNotification: NotificationService,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: CommentConfig
    ) {
        if (this.config === undefined && data) {
            this.config = data;
        }
    }

    public ngOnInit(): void {
        if (this.config === undefined) {
            throw new Error('Config of Comment is necessary');
        }
        this.loadComments();
    }

    public createComment() {
        const dialogRef = this.dialog.open(CreateDialogComponent, {
            data: this.config,
            hasBackdrop: true,
            width: '500px',
        });

        dialogRef.afterClosed().subscribe((reload) => {
            if (reload) {
                this.loadComments();
            }
        });
    }

    public updateComment(comment: Comment) {
        let data: CommentCreate = {
            id: comment.id,
            type: this.config!.type,
            message: comment.message,
            created: comment.created,
        };

        const dialogRef = this.dialog.open(EditDialogComponent, {
            hasBackdrop: true,
            width: '500px',
            data,
        });

        dialogRef.afterClosed().subscribe((reload) => {
            if (reload) {
                this.loadComments();
            }
        });
    }

    public deleteComment(comment: Comment) {
        this.svcComments.deleteComment(comment.id).subscribe({
            next: (value) => {
                const index = this.comments.indexOf(comment, 0);
                if (index > -1) {
                    this.comments.splice(index, 1);
                }
            },
            error: (error) => this.svcNotification.warning({ message: error.error.status }),
        });
    }

    private loadComments() {
        this.loadingComments = true;
        this.managerComment.load(this.config!).subscribe({
            next: (comments) => {
                this.comments = comments;
                this.loadingComments = false;
            },
            error: (error) => (this.loadingComments = false),
        });
    }
}
