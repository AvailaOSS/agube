import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgubeRoute } from './agube-route';
import { CreateDwellingComponent } from './dwelling/create-dwelling/create-dwelling.component';
import { ChangeOwnerComponent } from './dwelling/dwelling-detail-card/management-card/management-components/change-person/change-owner/change-owner.component';
import { ChangeResidentComponent } from './dwelling/dwelling-detail-card/management-card/management-components/change-person/change-resident/change-resident.component';
import { CreateReservoirComponent } from './reservoir/create-reservoir/create-reservoir.component';
import { SubRouterComponent } from './subRouter/sub-router.component';
import { SubRouterModule } from './subRouter/sub-router.module';
import { ChangeWaterMeterComponent } from './water-meter/change-water-meter/change-water-meter.component';
import { TaskRoute } from '@availa/task-fe';

const routes: Routes = [
  {
    path: '',
    component: SubRouterComponent,
    children: [
      {
        path: AgubeRoute.CONFIG,
        canActivate: [],
        loadChildren: () =>
          import('./configuration/configuration.module').then(
            (m) => m.ConfigurationModule
          ),
      },
      {
        path: AgubeRoute.DWELLING,
        canActivate: [],
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
        canActivate: [],
        loadChildren: () =>
          import('./reservoir/reservoir.module').then((m) => m.ReservoirModule),
      },
      {
        path: AgubeRoute.CREATE_RESERVOIR,
        component: CreateReservoirComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SubRouterModule],
  exports: [RouterModule],
})
export class AgubeRoutingModule {}
