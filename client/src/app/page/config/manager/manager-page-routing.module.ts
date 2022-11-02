import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerPageComponent } from './manager-page.component';

const routes: Routes = [{ path: '', component: ManagerPageComponent }];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class ManagerPageRoutingModule {}
