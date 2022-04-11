import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactBookModule } from '@availa/contact-book-fe';
import { environment } from 'src/environments/environment';
import { ContentComponent } from './content.component';
import { HomeManagerPageRoutingModule } from './content-routing.module';

@NgModule({
  declarations: [ContentComponent],
  imports: [
    CommonModule,
    HomeManagerPageRoutingModule,
    ContactBookModule.forRoot({
      contactBookRestconfig: { basePath: environment.contactBookBackendUrl },
    }),
  ],
})
export class ContentModule {}
