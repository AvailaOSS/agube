import { Component, OnInit } from '@angular/core';
import { IncidenceService } from 'apiaux/task-rest-api-lib/src/public-api';

@Component({
  selector: 'app-incidence',
  templateUrl: './incidence.component.html',
  styleUrls: ['./incidence.component.scss'],
})
export class IncidenceComponent implements OnInit {
  constructor(private readonly svcTaskService: IncidenceService) {
    // FIXME: move it to ngOnInit (good practice) ?
    this.svcTaskService
      .createIncidence({
        task: {
          description: '1',
          involved: [{ user: 1 }],
          state: 'PENDING',
          code: '1',
          publish_date: '1',
        },
        resolution_date: '2021-04-30T17:05:09.630Z',
        date_problem: new Date(),
        expected_resolution_date: new Date(),
        type: 0,
      })
      .subscribe((value) => {
        console.log(value);
      });
  }

  ngOnInit(): void {}
}
