import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create.component';

const routes: Routes = [
    {
        component: CreateComponent,
        path: '',
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class CreateRoutingModule {}
