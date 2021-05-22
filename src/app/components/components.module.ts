import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@availa/auth-fe';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExampleComponent } from './example/example.component';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { TableComponent } from './table/table.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IconsModule, TableModule, WavesModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    ExampleComponent,
    WorkInProgressComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgbModule,
    NgbModalModule,
    FormsModule,
    AuthModule,
    Ng2SearchPipeModule,
    TableModule,
    IconsModule,
    WavesModule,
  ],
  exports: [
    WorkInProgressComponent,
    TableComponent,
  ],
  providers: [],
})
export class ComponentsModule {}
