import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidenceService } from 'apiaux/task-rest-api-lib/src/public-api';

@Component({
  selector: 'app-incidence',
  templateUrl: './incidence.component.html',
  styleUrls: ['./incidence.component.scss'],
})
export class IncidenceComponent implements OnInit {
  public registerForm: FormGroup;
  constructor(
    private readonly svcTaskService: IncidenceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      state: ['', Validators.required],
      description: ['', Validators.required],
      username: ['', Validators.required],
      code: ['', Validators.required],
      resolution_date:['', Validators.required],
      publish_date: ['', [Validators.required]],
      date_problem: ['', Validators.required],
      expected_resolution_date: ['', Validators.required],
    });
    this.svcTaskService.incidenceList().subscribe(value => {
      console.log(value)
    })
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
  get f() {
    return this.registerForm.controls;
  }
  public onSubmit(): void {
   console.log(this.registerForm)
  }
}
