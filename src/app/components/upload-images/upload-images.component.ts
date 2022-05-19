import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-upload-images',
    templateUrl: './upload-images.component.html',
    styleUrls: ['./upload-images.component.scss'],
})
export class UploadImagesComponent {
    @Output() public sendFile: EventEmitter<File> = new EventEmitter();

    public selectedFile?: File;
    public preview: string = '';

    constructor() {}

    public selectFiles(event: any): void {
        this.selectedFile = event.target.files[0];
        if (this.selectedFile) {
            // FIXME: do this like sidebar.component if possible
            const reader = new FileReader();
            reader.onload = (e: any) => (this.preview = e.target.result);
            reader.readAsDataURL(this.selectedFile);
            this.sendFile.emit(this.selectedFile);
        }
    }
}
