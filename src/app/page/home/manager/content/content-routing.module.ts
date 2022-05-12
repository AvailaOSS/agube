import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content.component';

const routes: Routes = [
    {
        path: '',
        component: ContentComponent,
        children: [
            {
                path: '',
                redirectTo: 'dwellings',
                pathMatch: 'prefix',
            },
            {
                path: 'dwellings',
                loadChildren: () =>
                    import('../../../dwelling/manager/manager.module').then((m) => m.ManagerDwellingModule),
            },
            {
                path: 'reservoirs',
                loadChildren: () => import('../../../reservoir/manager/manager.module').then((m) => m.ManagerModule),
            },
            {
                path: 'config',
                loadChildren: () =>
                    import('../../../config/manager/manager-page.module').then((m) => m.ManagerPageModule),
            },
            {
                path: 'residents',
                loadChildren: () => import('../../../residents/manager/manager.module').then((m) => m.ManagerResidentsModule),
            },
            {
                path: 'manager/client/dwellings',
                loadChildren: () => import('../../../dwelling/client/client.module').then((m) => m.ClientModule),
            },
            {
                path: 'client/config',
                loadChildren: () => import('../../../config/client/client-page.module').then((m) => m.ClientPageModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeManagerPageRoutingModule {}
