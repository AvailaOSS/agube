import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReservoirService } from 'apiaux/agube-rest-api-lib/src/public-api';

@Component({
  selector: 'app-change-reservoir',
  templateUrl: './change-reservoir.component.html',
  styleUrls: ['./change-reservoir.component.scss'],
})
export class ChangeReservoirComponent implements OnInit {
  public user_id: any;
  public idWaterMeter: any;
  constructor(
    private readonly svcReservoirService: ReservoirService,
    private readonly svcRouter: Router,
    private readonly svcActivate:ActivatedRoute
  ) {
    this.svcActivate.queryParams.subscribe((params) => {
      this.idWaterMeter = params.data;
        this.user_id = params.user_id;
    });
    this.svcReservoirService
      .getCurrentWaterMeter1(+this.user_id)
      .subscribe((value) => {
        console.log(value);
      });
  }

  public ngOnInit() {
    this.svcReservoirService.getCurrentOwner1(this.idWaterMeter).subscribe(value => {
    console.log(value)
    })
  }
  public sendForm(event: any): void{
    console.log(event)
  }
}
