import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comment, CommentsService, ManagerService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { CommentManager } from '../comment.manager';
import { CreatedialogComponent } from '../createdialog/createdialog.component';
import { EditdialogComponent } from '../editdialog/editdialog.component';
import { CommentConfig, CommentCreate } from '../type';

@Component({
    selector: 'app-comment-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
    @Input() public config: CommentConfig | undefined;
    public loadingComments: boolean = false;
    public comments: Comment[] = [];
    public canLoad: boolean = false;

    constructor(
        private svcComments: CommentsService,
        private managerComment: CommentManager,
        private svcNotification: NotificationService,
        private svcManager: ManagerService,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: CommentConfig
    ) {
        if (this.config === undefined && data) {
            this.config = data;
        }
        this.svcManager.userIsManager().subscribe({
            next: (response) => (this.canLoad = response.is_manager),
        });
    }

    public ngOnInit(): void {
        if (this.config === undefined) {
            throw new Error('Config of Comment is necessary');
        }
        this.loadComments();
    }

    public createComment() {
        const dialogRef = this.dialog.open(CreatedialogComponent, {
            hasBackdrop: true,
            width: '500px',
            data: this.config,
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

        const dialogRef = this.dialog.open(EditdialogComponent, {
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
