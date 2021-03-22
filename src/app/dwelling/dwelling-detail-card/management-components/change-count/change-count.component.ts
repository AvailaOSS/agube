import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DwellingService } from 'apiaux/agube-rest-api-lib/src/public-api';

@Component({
  selector: 'app-change-count',
  templateUrl: './change-count.component.html',
  styleUrls: ['./change-count.component.scss']
})
export class ChangeCountComponent implements OnInit {
  public waterMeterId: string;
  public formConfigurationData: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly svcChangeWaterMeter: DwellingService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.waterMeterId = params.data;
    });
    this.svcChangeWaterMeter
      .getCurrentWaterMeter(+this.waterMeterId)
      .subscribe((value) => {
        this.formConfigurationData.emit(value);
      });
  }

  public ngOnInit(): void {}
  public sendForm(event: any): void {
    console.log('water', event);
    this.svcChangeWaterMeter
      .changeCurrentWaterMeter(+this.waterMeterId, {
        code: event.code
      })
      .subscribe((value) => {
        this.router.navigate(['/viviendas']);
      });
  }
}
