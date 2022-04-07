import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ManagerConfiguration, ManagerService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: [
    './parameters.component.scss',
    '../manager-config.component.scss',
  ],
})
export class ParametersComponent implements OnInit {
  public parametersForm: FormGroup;
  public hook_price = new FormControl('', [Validators.required]);
  public max_daily_consumption = new FormControl('', [Validators.required]);

  public releaseDate: Date | undefined = undefined;

  constructor(
    private readonly svcManager: ManagerService,
    private formBuilder: FormBuilder,
    private svcNotification: NotificationService
  ) {
    this.parametersForm = this.formBuilder.group({
      hook_price: this.hook_price,
      max_daily_consumption: this.max_daily_consumption,
    });
  }

  ngOnInit(): void {
    this.svcManager.getManagerConfiguration().subscribe((response) => {
      this.hook_price.setValue(response.hook_price);
      this.max_daily_consumption.setValue(response.max_daily_consumption);
      this.releaseDate =
        response.release_date === undefined
          ? undefined
          : new Date(response.release_date);
    });
  }

  saveParameters() {
    let config: ManagerConfiguration = {
      hook_price: this.hook_price.value,
      max_daily_consumption: this.max_daily_consumption.value,
    };
    this.svcManager.updateManagerConfiguration(config).subscribe({
      next: (response) => {
        this.releaseDate =
          response.release_date === undefined
            ? undefined
            : new Date(response.release_date);
      },
      error: (error) => {
        this.svcNotification.warning({ message: error }, 8);
      },
    });
  }

  public errorValidator(entity: string) {
    switch (entity) {
      case 'hook_price':
        if (this.hook_price.hasError('required')) {
          return 'El precio de enganche no puede estar vacio';
        }
        return '';
      case 'max_daily_consumption':
        if (this.max_daily_consumption.hasError('required')) {
          return `El consumo máximo diario no puede estar vacio`;
        }
        return '';
      default:
        return '';
    }
  }
}
