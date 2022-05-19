import { Observable } from 'rxjs';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FileUploadService } from './service/file-upload.service';
@Component({
    selector: 'app-upload-images',
    templateUrl: './upload-images.component.html',
    styleUrls: ['./upload-images.component.scss'],
})
export class UploadImagesComponent implements OnInit {
    @Output() public sendFile: EventEmitter<any> = new EventEmitter();
    selectedFiles?: FileList;
    selectedFileNames: string[] = [];
    progressInfos: any[] = [];
    message: string[] = [];
    previews: string[] = [];
    imageInfos?: Observable<any>;

    constructor(private uploadService: FileUploadService) {}

    selectFiles(event: any): void {
        this.message = [];
        this.progressInfos = [];
        this.selectedFileNames = [];
        this.selectedFiles = event.target.files;
        this.previews = [];
        if (this.selectedFiles && this.selectedFiles[0]) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                console.log(e.target.result);
                this.previews.push(e.target.result);
            };
            reader.readAsDataURL(this.selectedFiles[0]);
            this.selectedFileNames.push(this.selectedFiles[0].name);
            this.sendFile.emit(this.selectedFiles);
        }
    }

    ngOnInit(): void {
        this.imageInfos = this.uploadService.getFiles();
    }
}
