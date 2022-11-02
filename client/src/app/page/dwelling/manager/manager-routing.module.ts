import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';

const routes: Routes = [
    { path: '', component: ManagerComponent },
    {
        loadChildren: () => import('../create/create.module').then((m) => m.CreateModule),
        path: 'create',
    },
    {
        loadChildren: () => import('../../person/change/change.module').then((m) => m.ChangeModule),
        path: 'person',
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class ManagerRoutingModule {}
