import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SidebarConfiguration } from './sidebar.configuration';

interface SelectedComponent {
  path: string;
  name: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() public currentComponentName: EventEmitter<string>;
  @Input() user: any;
  public menuComponents: SelectedComponent[];
  public toogleVision;
  public selectComponent: string;

  constructor(
    private readonly route: Router,
    private readonly router: ActivatedRoute,
    private sidebarRoutes: SidebarConfiguration
  ) {
    this.currentComponentName = new EventEmitter();
    this.menuComponents = this.sidebarRoutes.routes;
    this.toogleVision = true;
  }

  public selectedComponent(component: SelectedComponent): void {
    this.route.navigate([
      { outlets: { primary: component.path, contactPopup: 'contact' } },
    ]);

    this.currentComponentName.emit(component.name);
    this.selectComponent = component.name;
  }

  public toogleSidebar(): void {
    this.toogleVision = !this.toogleVision;
  }
}
