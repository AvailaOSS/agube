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
        path: 'person',
        loadChildren: () => import('../../person/change/change.module').then((m) => m.ChangeModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManagerRoutingModule {}
