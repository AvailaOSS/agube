import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerDetailComponent } from '../detail/owner/owner-detail.component';
import { ResidentDetailComponent } from './../detail/resident/resident-detail.component';
import { ManagerOwnerComponent } from './owner/manager.component';
import { ManagerResidentComponent } from './resident/manager.component';

const routes: Routes = [
    { path: 'owners', component: ManagerOwnerComponent },
    { path: 'owners/detail', component: OwnerDetailComponent },
    { path: 'residents', component: ManagerResidentComponent },
    { path: 'residents/detail', component: ResidentDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManagerRoutingModule {}
