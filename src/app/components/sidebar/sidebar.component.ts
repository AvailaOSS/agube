import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { SidebarConfiguration } from "./sidebar.configuration";

interface SelectedComponent {
  path: string;
  name: string;
}

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent {
  @Output() public currentComponentName: EventEmitter<string>;
  @Input() user: any;
  public menuComponents: SelectedComponent[];
  public toogleVision;
  public selectComponent: string;

  constructor(
    private readonly route: Router,
    private sidebarRoutes: SidebarConfiguration
  ) {
    this.currentComponentName = new EventEmitter();
    this.menuComponents = this.sidebarRoutes.routes;
    this.toogleVision = true;
  }

  public selectedComponent(component: SelectedComponent): void {
    this.route.navigate([component.path]);
    this.currentComponentName.emit(component.name);
    this.selectComponent = component.name;
  }

  public toogleSidebar(): void {
    this.toogleVision = !this.toogleVision;
  }
}
