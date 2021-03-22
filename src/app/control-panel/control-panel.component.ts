import { Component, OnInit } from '@angular/core';
import { ControlPanelGroup } from './control-panel-group/control-panel-group';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit {
  public users: any;
  public managementButtons: ControlPanelGroup;
  public planningButtons: ControlPanelGroup;
  public configurationButtons: ControlPanelGroup;

  constructor() {}

  public ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('users')) || [];
    this.managementButtons = {
      name: 'Gestión',
      buttons: [
        {
          name: 'Viviendas',
          redirect: 'viviendas',
          icon: 'fas fa-home',
        },
        {
          name: 'Contactos',
          redirect: 'wip',
          icon: 'fas fa-users',
        },
        {
          name: 'Agenda',
          redirect: 'wip',
          icon: 'fas fa-address-book',
        },
      ],
    };
    this.planningButtons = {
      name: 'Planificación',
      buttons: [
        {
          name: 'Lectura Contador',
          redirect: 'wip',
          icon: 'fas fa-faucet',
        },
        {
          name: 'Incidencias',
          redirect: 'wip',
          icon: 'fas fa-tasks',
        },
        {
          name: 'Facturas',
          redirect: 'wip',
          icon: 'fas fa-file-invoice',
        },
        {
          name: 'Correos',
          redirect: 'wip',
          icon: 'fas fa-envelope',
        },
        {
          name: 'Calendario',
          redirect: 'wip',
          icon: 'fas fa-calendar-alt',
        },
      ],
    };
    this.configurationButtons = {
      name: 'Configuración',
      buttons: [
        {
          name: 'Depósito',
          redirect: 'wip',
          icon: 'fas fa-swimming-pool',
        },
        {
          name: 'General',
          redirect: 'wip',
          icon: 'fas fa-tools',
        },
      ],
    };
  }
}
