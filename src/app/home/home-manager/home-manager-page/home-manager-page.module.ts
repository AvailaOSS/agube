import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactBookModule } from '@availa/contact-book-fe';
import { environment } from 'src/environments/environment';
import { HomeManagerPageComponent } from './home-manager-page.component';
import { HomeManagerPageRoutingModule } from './home-manager-page-routing.module';

@NgModule({
  declarations: [HomeManagerPageComponent],
  imports: [
    CommonModule,
    HomeManagerPageRoutingModule,
    ContactBookModule.forRoot({
      contactBookRestconfig: { basePath: environment.contactBookBackendUrl },
    }),
  ],
})
export class HomeManagerPageModule {}
