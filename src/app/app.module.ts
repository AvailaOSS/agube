import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TaskRoute } from '@availa/task-fe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgubeRoute } from './agube/agube-route';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvailaModule } from './availa/availa.module';
import { ComponentsModule } from './components/components.module';
import { SidebarConfiguration } from './components/sidebar/sidebar.configuration';
import { AgubeModule } from './agube/agube.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgubeApiModule } from '@availa/agube-rest-api';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SidebarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    AvailaModule,
    NgbModule,
    AppRoutingModule,
    AgubeModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: SidebarConfiguration,
      useValue: {
        routes: [
          {
            path: AgubeRoute.DWELLING,
            name: 'Viviendas',
            icon: 'fas fa-home',
          },
          {
            path: AgubeRoute.RESERVOIR,
            name: 'Depósitos',
            icon: 'fas fa-hand-holding-water',
          },
          {
            path: TaskRoute.INCIDENCE,
            name: 'Incidencias',
            icon: 'fas fa-calendar-alt',
          },
          {
            path: AgubeRoute.CONFIG,
            name: 'Configuración',
            icon: 'fas fa-cog',
          },
        ],
      },
    },
  ],
  exports: [],
})
export class AppModule {}
