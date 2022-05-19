import { Observable } from 'rxjs';
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
    selector: 'app-upload-images',
    templateUrl: './upload-images.component.html',
    styleUrls: ['./upload-images.component.scss'],
})
export class UploadImagesComponent {
    @Output() public sendFile: EventEmitter<File> = new EventEmitter();

    selectedFile?: File;
    preview: string = '';
    imageInfos?: Observable<any>;

    constructor() {}

    selectFiles(event: any): void {
        this.selectedFile = event.target.files[0];
        if (this.selectedFile) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.preview = e.target.result;
            };
            reader.readAsDataURL(this.selectedFile);
            this.sendFile.emit(this.selectedFile);
        }
    }
}
