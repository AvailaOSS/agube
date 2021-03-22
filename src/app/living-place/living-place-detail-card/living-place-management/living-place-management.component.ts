import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-living-place-management',
  templateUrl: './living-place-management.component.html',
  styleUrls: ['./living-place-management.component.scss'],
})
export class LivingPlaceManagementComponent implements OnInit {
  constructor(private readonly svcRouter: Router) {}

  ngOnInit(): void {}

  public seeAllBills(): void {
    console.log('hola');
    this.svcRouter.navigate(['vivienda/facturas']);
  }
  public seeBills(): void {
    this.svcRouter.navigate(['/vivienda/facturas']);
  }
  public changeCount(): void {
    this.svcRouter.navigate(['/vivienda/cambio/contador']);
  }
  public changeResident(): void {
    this.svcRouter.navigate(['/vivienda/residente']);
  }
  public changeOwner(): void {
    this.svcRouter.navigate(['/vivienda/propietario']);
  }
  public changePay(): void {
    this.svcRouter.navigate(['/vivienda/cambio/pagador']);
  }
}
