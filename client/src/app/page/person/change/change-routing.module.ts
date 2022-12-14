import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent } from './owner/owner.component';
import { ResidentComponent } from './resident/resident.component';

const routes: Routes = [
    {
        component: ResidentComponent,
        path: 'resident',
    },
    {
        component: OwnerComponent,
        path: 'owner',
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class ChangeRoutingModule {}
