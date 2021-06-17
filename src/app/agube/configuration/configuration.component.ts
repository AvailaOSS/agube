import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagerService } from '@availa/agube-rest-api';
import { AgubeRoute } from '../agube-route';
import { NotificationService } from '@availa/notification';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  public userId: any;
  public registerForm: FormGroup;
  public options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  constructor(
    private readonly svcManager: ManagerService,
    private formBuilder: FormBuilder,
    private svcRouter: Router,
    private alertService: NotificationService
  ) {
    this.registerForm = this.formBuilder.group({
      hook_price: new FormControl(),
      release_date: new FormControl(),
      max_daily_consumption: new FormControl(),
    });
  }

  public ngOnInit(): void {
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
    this.svcRouter.navigate([AgubeRoute.CONFIG]);
  }

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
          this.alertService.success('Actualizado con éxito', this.options);
          this.goToControlPanel();
        },
        (error) => {
          this.alertService.error('error', this.options);
        }
      );
  }
}
