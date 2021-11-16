import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgubeApiModule } from '@availa/agube-rest-api';
import { TaskModule, TaskRoute } from '@availa/task-fe';
import {
  ContactBookComponent,
  ContactBookModule,
} from '@availa/contact-book-fe';
import { environment } from 'src/environments/environment';
import { SubRouterComponent } from './subRouter/sub-router.component';
import { CreateDwellingComponent } from './dwelling/create-dwelling/create-dwelling.component';
import { ChangeResidentComponent } from './dwelling/dwelling-detail-card/management-card/management-components/change-person/change-resident/change-resident.component';
import { ChangeOwnerComponent } from './dwelling/dwelling-detail-card/management-card/management-components/change-person/change-owner/change-owner.component';
import { ChangeWaterMeterComponent } from './water-meter/change-water-meter/change-water-meter.component';
import { CreateReservoirComponent } from './reservoir/create-reservoir/create-reservoir.component';
import { SubRouterModule } from './subRouter/sub-router.module';
import { AgubeRoute } from './agube-route';
import { UserGuard } from './helpers/user.guard';
import { ManagerGuard } from './helpers/manager.guard';

const routes: Routes = [
  {
    path: '',
    component: SubRouterComponent,
    children: [
      {
        path: AgubeRoute.CONFIG,
        canLoad: [UserGuard, ManagerGuard],
        canActivate: [UserGuard, ManagerGuard],
        loadChildren: () =>
          import('./configuration/configuration.module').then(
            (m) => m.ConfigurationModule
          ),
      },
      {
        path: AgubeRoute.DWELLING,
        canLoad: [UserGuard, ManagerGuard],
        canActivate: [UserGuard, ManagerGuard],
        loadChildren: () =>
          import('./dwelling/dwelling.module').then((m) => m.DwellingModule),
      },
      { path: AgubeRoute.CREATE_DWELLING, component: CreateDwellingComponent },
      { path: AgubeRoute.CHANGE_RESIDENT, component: ChangeResidentComponent },
      { path: AgubeRoute.CHANGE_OWNER, component: ChangeOwnerComponent },
      {
        path: AgubeRoute.CHANGE_WATER_METER,
        component: ChangeWaterMeterComponent,
      },
      {
        path: AgubeRoute.RESERVOIR,
        canLoad: [UserGuard, ManagerGuard],
        canActivate: [UserGuard, ManagerGuard],
        loadChildren: () =>
          import('./reservoir/reservoir.module').then((m) => m.ReservoirModule),
      },
      {
        path: AgubeRoute.CREATE_RESERVOIR,
        component: CreateReservoirComponent,
      },
      {
        path: TaskRoute.INCIDENCE,
        canLoad: [UserGuard, ManagerGuard],
        canActivate: [UserGuard, ManagerGuard],
        loadChildren: () =>
          import('./task/task.module').then((m) => m.TaskModule),
      },
      {
        path: 'contact',
        component: ContactBookComponent,
        outlet: 'contactPopup',
      },

    ],
  },
];

@NgModule({
  imports: [
    AgubeApiModule.forRoot({ basePath: environment.agubeBackendUrl }),
    TaskModule.forRoot({
      contactBookRestconfig: {
        basePath: environment.contactBookBackendUrl,
      },
      taskRestconfig: {
        basePath: environment.taskBackendUrl,
      },
    }),
    ContactBookModule.forRoot({
      contactBookRestconfig: {
        basePath: environment.contactBookBackendUrl,
      },
    }),

    RouterModule.forChild(routes),
  ],
  exports: [RouterModule, SubRouterModule],
})
export class AppRoutingModule {}
