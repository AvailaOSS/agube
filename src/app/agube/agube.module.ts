
import { NgModule } from '@angular/core';
import { AgubeApiModule } from '@availa/agube-rest-api';
import { environment } from '../../environments/environment';
import { AgubeRoutingModule } from './agube-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    AgubeApiModule.forRoot({ basePath: environment.agubeBackendUrl }),
    AgubeRoutingModule,
  ],
})
export class AgubeModule {}
