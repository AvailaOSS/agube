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
                path: 'springsources',
                loadChildren: () =>
                    import('../../../spring-source/manager/manager.module').then((m) => m.ManagerSpringSourceModule),
            },
            {
                path: 'config',
                loadChildren: () =>
                    import('../../../config/manager/manager-page.module').then((m) => m.ManagerPageModule),
            },
            {
                path: 'person',
                loadChildren: () => import('../../../person/person/manage/manage.module').then((m) => m.ManageModule),
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
