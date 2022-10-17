import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerPageComponent } from './manager-page.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'prefix',
    },
    {
        path: '',
        component: ManagerPageComponent,
        children: [
            {
                path: 'home',
                loadChildren: () => import('./content/content.module').then((m) => m.ContentModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManagerPageRoutingModule {}
