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
          icon: 'fas fa-home fa-2x',
        },
        {
          name: 'Contactos',
          redirect: 'contactos',
          icon: 'fas fa-users fa-2x',
        },
        {
          name: 'Agenda',
          redirect: 'wip',
          icon: 'fas fa-address-book fa-2x',
        },
      ],
    };
    this.planningButtons = {
      name: 'Planificación',
      buttons: [
        {
          name: 'Lectura Contador',
          redirect: 'wip',
          icon: 'fas fa-faucet fa-2x',
        },
        {
          name: 'Incidencias',
          redirect: 'wip',
          icon: 'fas fa-tasks fa-2x',
        },
        {
          name: 'Facturas',
          redirect: 'wip',
          icon: 'fas fa-file-invoice fa-2x',
        },
        {
          name: 'Correos',
          redirect: 'wip',
          icon: 'fas fa-envelope fa-2x',
        },
        {
          name: 'Calendario',
          redirect: 'wip',
          icon: 'fas fa-calendar-alt fa-2x',
        },
      ],
    };
    this.configurationButtons = {
      name: 'Configuración',
      buttons: [
        {
          name: 'Depósito',
          redirect: 'depositos',
          icon: 'fas fa-swimming-pool fa-2x',
        },
        {
          name: 'General',
          redirect: 'wip',
          icon: 'fas fa-tools fa-2x',
        },
      ],
    };
  }
}
