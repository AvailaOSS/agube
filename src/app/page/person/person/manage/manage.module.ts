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
import { AddressModule } from 'src/app/components/address/address.module';
import { CardButtonModule } from 'src/app/page/dwelling/card-button/card-button.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { OwnerDetailComponent } from './../detail/owner/owner-detail.component';
import { ResidentDetailComponent } from './../detail/resident/resident-detail.component';
import { ManagerRoutingModule } from './manage-routing.module';
import { ManagerOwnerComponent } from './owner/manager.component';
import { TableOwnerComponent } from './owner/table/table.component';
import { ManagerResidentComponent } from './resident/manager.component';
import { TableResidentComponent } from './resident/table/table.component';

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
})
export class ManageModule {}
