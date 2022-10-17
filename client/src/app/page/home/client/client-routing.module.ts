import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';

const routes: Routes = [
    {
        path: '',
        component: ClientComponent,
        children: [
            {
                path: '',
                redirectTo: 'dwellings',
                pathMatch: 'prefix',
            },
            {
                path: 'dwellings',
                loadChildren: () => import('../../dwelling/client/client.module').then((m) => m.ClientModule),
            },
            {
                path: 'config',
                loadChildren: () => import('../../config/client/client-page.module').then((m) => m.ClientPageModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientRoutingModule {}
