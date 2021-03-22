<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
>>>>>>> 92509f4... feat: add contador, vivienda, residente , pagador, propietario
import { Router } from '@angular/router';

@Component({
  selector: 'app-dwelling-management',
  templateUrl: './dwelling-management.component.html',
  styleUrls: ['./dwelling-management.component.scss'],
})
export class DWellingManagementComponent implements OnInit {
  constructor(private readonly svcRouter: Router) {}

  ngOnInit(): void {}
<<<<<<< HEAD
=======
  public ngOnChanges(): void {
    console.log(this.DWelling);
    console.log(this.waterMeter);
  }
>>>>>>> 92509f4... feat: add contador, vivienda, residente , pagador, propietario

  public seeAllBills(): void {
    console.log('hola');
    this.svcRouter.navigate(['vivienda/facturas']);
  }
  public seeBills(): void {
    this.svcRouter.navigate(['/vivienda/facturas']);
  }
  public changeCount(): void {
    this.svcRouter.navigate(['/vivienda/cambio/contador'], {
      queryParams: { data: this.DWelling.id },
    });
  }
  public changeResident(): void {
    this.svcRouter.navigate(['/vivienda/residente'], {
      queryParams: { data: this.DWelling.id },
    });
  }
  public changeOwner(): void {
    this.svcRouter.navigate(['/vivienda/propietario'], {
      queryParams: { data: this.DWelling.id },
    });
  }
  public changePay(): void {
    this.svcRouter.navigate(['/vivienda/cambio/pagador']);
  }
}
