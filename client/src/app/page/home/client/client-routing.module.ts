import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';

const routes: Routes = [
    {
        children: [
            {
                path: '',
                pathMatch: 'prefix',
                redirectTo: 'dwellings',
            },
            {
                loadChildren: () => import('../../dwelling/client/client.module').then((m) => m.ClientModule),
                path: 'dwellings',
            },
            {
                loadChildren: () => import('../../config/client/client-page.module').then((m) => m.ClientPageModule),
                path: 'config',
            },
        ],
        component: ClientComponent,
        path: '',
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class ClientRoutingModule {}
