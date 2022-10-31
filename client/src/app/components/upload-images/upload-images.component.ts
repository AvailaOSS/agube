import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-upload-images',
    styleUrls: ['./upload-images.component.scss'],
    templateUrl: './upload-images.component.html',
})
export class UploadImagesComponent {
    @Output() public sendFile: EventEmitter<File> = new EventEmitter();

    public selectedFile?: File;
    public preview: any = '';

    constructor() {}

    public selectFiles(event: any): void {
        this.selectedFile = event.target.files[0];
        if (this.selectedFile) {
            // FIXME: do this like sidebar.component if possible
            const reader = new FileReader();
            reader.addEventListener('load', () => (this.preview = reader.result), false);
            reader.readAsDataURL(this.selectedFile);
            this.sendFile.emit(this.selectedFile);
        }
    }
}
