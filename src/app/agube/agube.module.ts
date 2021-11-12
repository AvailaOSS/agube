
import { NgModule } from '@angular/core';
import { ContactBookModule } from '@availa/contact-book-fe';
import { TaskModule } from '@availa/task-fe';
import { environment } from '../../environments/environment';
import { AgubeRoutingModule } from './agube-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    AgubeRoutingModule,
  ],
})
export class AgubeModule {}
