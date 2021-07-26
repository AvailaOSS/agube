import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
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
export class SidebarComponent implements OnInit {
  @Output() public currentComponentName: EventEmitter<string> =
    new EventEmitter();
  public menuComponents: SelectedComponent[] = [];
  public toogleVision = true;
  @Input() user: any;
  public selectComponent: string;

  constructor(private readonly route: Router, private sidebarRoutes: SidebarConfiguration) {
    this.menuComponents = this.sidebarRoutes.routes;
  }

  ngOnInit(): void { }

  public selectedComponent(component: SelectedComponent): void {
    this.route.navigate([component.path]);
    this.currentComponentName.emit(component.name);
    this.selectComponent = component.name;
  }

  public toogleSidebar(): void {
    this.toogleVision = !this.toogleVision;
  }
}
