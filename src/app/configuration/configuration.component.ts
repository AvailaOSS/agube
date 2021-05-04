import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagerService } from 'apiaux/agube-rest-api-lib/src/public-api';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  public userId: any;

  public registerForm: FormGroup;
  constructor(
    private readonly svcManager: ManagerService,
    private formBuilder: FormBuilder,
    private svcRouter: Router
  ) {
    this.registerForm = this.formBuilder.group({
      hook_price: new FormControl(),
      release_date: new FormControl(),
      max_daily_consumption: new FormControl(),
    });
    this.svcManager.getManagerByUser().subscribe((value) => {
      this.userId = value.user_id;
      this.svcManager
        .getManagerConfiguration(this.userId)
        .subscribe((values) => {
          this.registerForm
            .get('hook_price')
            .setValue(values.hook_price.hook_price);
          this.registerForm
            .get('release_date')
            .setValue(values.hook_price.release_date.split('T')[0]);
          this.registerForm
            .get('max_daily_consumption')
            .setValue(values.max_daily_consumption);
        });
    });
  }
  public goToControlPanel(): void {
    this.svcRouter.navigate(['/control-panel']);
  }
  ngOnInit(): void {}
  public onSubmit(): void {
    this.svcManager
      .updateManagerConfiguration(this.userId, {
        max_daily_consumption: this.registerForm.value.max_daily_consumption,
        hook_price: {
          hook_price: this.registerForm.value.hook_price,
        },
      })
      .subscribe(
        (value) => {
          this.goToControlPanel();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
