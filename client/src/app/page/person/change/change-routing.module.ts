import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent } from './owner/owner.component';
import { ResidentComponent } from './resident/resident.component';

const routes: Routes = [
    {
        path: 'resident',
        component: ResidentComponent,
    },
    {
        path: 'owner',
        component: OwnerComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChangeRoutingModule {}
