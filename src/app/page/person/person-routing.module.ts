import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent } from './change/owner/owner.component';
import { ResidentComponent } from './change/resident/resident.component';

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
export class PersonRoutingModule {}
