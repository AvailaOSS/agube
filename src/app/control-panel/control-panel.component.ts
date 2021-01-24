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
          redirect: '',
          icon: 'fas fa-home',
        },
        {
          name: 'Contactos',
          redirect: '',
          icon: 'fas fa-users',
        },
        {
          name: 'Agenda',
          redirect: '',
          icon: 'fas fa-address-book',
        },
      ],
    };
    this.planningButtons = {
      name: 'Planificación',
      buttons: [
        {
          name: 'Lectura Contador',
          redirect: '',
          icon: 'fas fa-faucet',
        },
        {
          name: 'Incidencias',
          redirect: '',
          icon: 'fas fa-tasks',
        },
        {
          name: 'Facturas',
          redirect: '',
          icon: 'fas fa-file-invoice',
        },
        {
          name: 'Correos',
          redirect: '',
          icon: 'fas fa-envelope',
        },
        {
          name: 'Calendario',
          redirect: '',
          icon: 'fas fa-calendar-alt',
        },
      ],
    };
    this.configurationButtons = {
      name: 'Configuración',
      buttons: [
        {
          name: 'Depósito',
          redirect: '',
          icon: 'fas fa-swimming-pool',
        },
        {
          name: 'General',
          redirect: '',
          icon: 'fas fa-tools',
        },
      ],
    };
  }
}
