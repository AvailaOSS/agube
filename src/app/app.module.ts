import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TaskRoute } from "@availa/task-fe";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AgubeRoute } from "./agube/agube-route";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AvailaModule } from "./availa/availa.module";
import { ComponentsModule } from "./components/components.module";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { SidebarConfiguration } from "./components/sidebar/sidebar.configuration";

@NgModule({
  declarations: [AppComponent, SidebarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
    AvailaModule,
    NgbModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: SidebarConfiguration,
      useValue: {
        routes: [
          { path: AgubeRoute.DWELLING, name: "Viviendas", icon: "fas fa-home" },
          { path: AgubeRoute.RESERVOIR, name: "Depósitos", icon: "fas fa-hand-holding-water" },
          { path: TaskRoute.INCIDENCE, name: "Incidencias", icon: "fas fa-calendar-alt" },
          { path: AgubeRoute.CONFIG, name: "Configuración", icon: "fas fa-cog" },
        ],
      },
    },
  ],
})
export class AppModule {}
