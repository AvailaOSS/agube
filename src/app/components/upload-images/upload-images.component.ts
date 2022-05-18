import { FormControl } from '@angular/forms';
import { NotificationService } from '@availa/notification';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './service/file-upload.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-upload-images',
    templateUrl: './upload-images.component.html',
    styleUrls: ['./upload-images.component.scss'],
})
export class UploadImagesComponent implements OnInit {
    selectedFiles?: FileList;
    previews: string[] = [];
    imageInfos?: Observable<any>;
    public fileInput = new FormControl('');
    constructor(private uploadService: FileUploadService, private svcNotification: NotificationService) {}
    selectFiles(event: any): void {
        this.selectedFiles = event.target.files;
        if (this.selectedFiles) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                console.log(e.target.result);
                this.previews.push(e.target.result);
                reader.readAsDataURL(this.selectedFiles![0]);
            };
        }
    }
    uploadFiles(): void {
        if (this.selectedFiles) {
            this.upload(0, this.selectedFiles![0]);
        }
    }
    upload(idx: number, file: File): void {
        if (file) {
            this.uploadService.upload(file).subscribe({
                next: (event: any) => {
                    if (event instanceof HttpResponse) {
                        this.imageInfos = this.uploadService.getFiles();
                    }
                },
                error: (error) =>
                    this.svcNotification.warning({
                        message: 'Could not upload the file: ' + file.name,
                    }),
            });
        }
    }
    ngOnInit(): void {
        this.imageInfos = this.uploadService.getFiles();
    }
}
