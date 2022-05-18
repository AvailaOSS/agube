import { FormControl } from '@angular/forms';
import { NotificationService } from '@availa/notification';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './service/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-upload-images',
    templateUrl: './upload-images.component.html',
    styleUrls: ['./upload-images.component.scss'],
})
export class UploadImagesComponent implements OnInit {
    selectedFiles?: FileList;
    selectedFileNames: string[] = [];
    previews: string[] = [];
    imageInfos?: Observable<any>;
    public fileInput = new FormControl('');
    constructor(private uploadService: FileUploadService, private svcNotification: NotificationService) {}
    selectFiles(event: any): void {
        this.selectedFileNames = [];
        this.selectedFiles = event.target.files;
        this.previews = [];
        if (this.selectedFiles && this.selectedFiles[0]) {
            const numberOfFiles = this.selectedFiles.length;
            for (let i = 0; i < numberOfFiles; i++) {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    console.log(e.target.result);
                    this.previews.push(e.target.result);
                };
                reader.readAsDataURL(this.selectedFiles[i]);
                this.selectedFileNames.push(this.selectedFiles[i].name);
            }
        }
    }
    uploadFiles(): void {
        if (this.selectedFiles) {
            for (let i = 0; i < this.selectedFiles.length; i++) {
                this.upload(i, this.selectedFiles[i]);
            }
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
