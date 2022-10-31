import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { HomeManagerPageRoutingModule } from './content-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { UploadImagesModule } from 'src/app/components/upload-images/upload-images.module';

@NgModule({
    declarations: [ContentComponent],
    imports: [CommonModule, HomeManagerPageRoutingModule, TranslateModule, UploadImagesModule],
})
export class ContentModule {}
