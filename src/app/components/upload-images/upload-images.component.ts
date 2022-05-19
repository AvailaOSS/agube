import { FormControl } from '@angular/forms';
import { NotificationService } from '@availa/notification';
import { Observable } from 'rxjs';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FileUploadService } from './service/file-upload.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-upload-images',
    templateUrl: './upload-images.component.html',
    styleUrls: ['./upload-images.component.scss'],
})
export class UploadImagesComponent implements OnInit {
    @Output() public sendFile: EventEmitter<any> = new EventEmitter();
    selectedFiles?: FileList;
    previews: string[] = [];
    imageInfos?: Observable<any>;

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
            this.sendFile.emit(this.selectedFiles!);
        }
    }

    ngOnInit(): void {
        this.imageInfos = this.uploadService.getFiles();
    }
}
