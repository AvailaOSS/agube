import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';

const routes: Routes = [
    { path: '', component: ClientComponent },
    {
        loadChildren: () => import('../detail/detail.module').then((m) => m.DetailModule),
        path: 'detail',
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class ClientRoutingModule {}
