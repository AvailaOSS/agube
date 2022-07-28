import { ResidentDetailComponent } from './../detail/resident/resident-detail.component';
import { OwnerDetailComponent } from './../detail/owner/owner-detail.component';
import { OwnerDetail } from '@availa/agube-rest-api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ManagerRoutingModule } from './manage-routing.module';
import { ManagerOwnerComponent } from './owner/manager.component';
import { TableOwnerComponent } from './owner/table/table.component';
import { ManagerResidentComponent } from './resident/manager.component';
import { TableResidentComponent } from './resident/table/table.component';
import { AddressModule } from 'src/app/components/address/address.module';
import { CardButtonModule } from 'src/app/page/dwelling/card-button/card-button.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/app/utils/error.interceptor';

@NgModule({
    declarations: [
        ManagerOwnerComponent,
        ManagerResidentComponent,
        TableOwnerComponent,
        TableResidentComponent,
        OwnerDetailComponent,
        ResidentDetailComponent,
    ],
    imports: [
        CommonModule,
        ManagerRoutingModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        PipesModule,
        MatIconModule,
        MatDividerModule,
        MatTooltipModule,
        TranslateModule,
        MatPaginatorModule,
        AddressModule,
        CardButtonModule,
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
})
export class ManageModule {}
