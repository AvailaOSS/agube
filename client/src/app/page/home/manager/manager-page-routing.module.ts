import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerPageComponent } from './manager-page.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'home',
    },
    {
        children: [
            {
                loadChildren: () => import('./content/content.module').then((m) => m.ContentModule),
                path: 'home',
            },
        ],
        component: ManagerPageComponent,
        path: '',
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class ManagerPageRoutingModule {}
