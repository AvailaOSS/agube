import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content.component';

const routes: Routes = [
    {
        children: [
            {
                path: '',
                pathMatch: 'prefix',
                redirectTo: 'dwellings',
            },
            {
                loadChildren: () =>
                    import('../../../dwelling/manager/manager.module').then((m) => m.ManagerDwellingModule),
                path: 'dwellings',
            },
            {
                loadChildren: () => import('../../../reservoir/manager/manager.module').then((m) => m.ManagerModule),
                path: 'reservoirs',
            },
            {
                loadChildren: () =>
                    import('../../../spring-source/manager/manager.module').then((m) => m.ManagerSpringSourceModule),
                path: 'springsources',
            },
            {
                loadChildren: () =>
                    import('../../../config/manager/manager-page.module').then((m) => m.ManagerPageModule),
                path: 'config',
            },
            {
                loadChildren: () => import('../../../person/person/manage/manage.module').then((m) => m.ManageModule),
                path: 'person',
            },
            {
                loadChildren: () => import('../../../dwelling/client/client.module').then((m) => m.ClientModule),
                path: 'manager/client/dwellings',
            },
            {
                loadChildren: () => import('../../../config/client/client-page.module').then((m) => m.ClientPageModule),
                path: 'client/config',
            },
        ],
        component: ContentComponent,
        path: '',
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class HomeManagerPageRoutingModule {}
