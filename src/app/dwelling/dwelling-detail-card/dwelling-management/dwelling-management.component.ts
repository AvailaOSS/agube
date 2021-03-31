import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { DwellingDetail } from '../../../../../apiaux/agube-rest-api-lib/src/lib/model/dwellingDetail';
import { ManagerService } from '../../../../../apiaux/agube-rest-api-lib/src/lib/service/manager.service';

@Component({
  selector: 'app-dwelling-management',
  templateUrl: './dwelling-management.component.html',
  styleUrls: ['./dwelling-management.component.scss'],
})
export class DWellingManagementComponent implements OnInit, OnChanges {
  @Input() DWelling: DwellingDetail;
  @Input() waterMeter: string;
  public user_id: string;
  constructor(
    private readonly svcRouter: Router,
    private readonly svcManager: ManagerService
  ) {
    this.svcManager
      .getManagerByUser()
      .subscribe((value) => {
        this.user_id= value.user_id;
      });
  }

  ngOnInit(): void {}
  public ngOnChanges(): void {
    console.log(this.DWelling);
    console.log(this.waterMeter);
  }

  public seeAllBills(): void {
    this.svcRouter.navigate(['vivienda/facturas']);
  }
  public seeBills(): void {
    this.svcRouter.navigate(['/vivienda/facturas']);
  }
  public changeCount(): void {
    this.svcRouter.navigate(['/vivienda/cambio/contador'], {
      queryParams: { data: this.DWelling.id , user_id: this.user_id},
    });
  }
  public changeResident(): void {
    this.svcRouter.navigate(['/vivienda/residente'], {
      queryParams: { data: this.DWelling.id , user_id: this.user_id},
    });
  }
  public changeOwner(): void {
    this.svcRouter.navigate(['/vivienda/propietario'], {
      queryParams: { data: this.DWelling.id , user_id: this.user_id},
    });
  }
  public changePay(): void {
    this.svcRouter.navigate(['/vivienda/cambio/pagador'], {
      queryParams: { data: this.DWelling.id, user_id: this.user_id },
    });
  }
}
