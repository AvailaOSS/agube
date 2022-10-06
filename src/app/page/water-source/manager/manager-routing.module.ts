import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';

const routes: Routes = [
    { path: '', component: ManagerComponent },
    {
        path: 'create',
        loadChildren: () => import('../create/create.module').then((m) => m.CreateModule),
    },
    {
        path: 'detail',
        loadChildren: () => import('../detail/detail.module').then((m) => m.DetailModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManagerReservoirRoutingModule {}
