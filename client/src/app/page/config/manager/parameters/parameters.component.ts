import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManagerConfiguration, ManagerService } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
    selector: 'app-parameters',
    styleUrls: ['./parameters.component.scss', '../manager-page.component.scss'],
    templateUrl: './parameters.component.html',
})
export class ParametersComponent implements OnInit {
    public loadSave: boolean = false;
    public parametersForm: FormGroup;
    public hook_price = new FormControl('', [Validators.required]);
    public max_daily_consumption = new FormControl('', [Validators.required]);

    public releaseDate: Date | undefined = undefined;

    private static seconds: number = 1000;

    constructor(
        private readonly svcManager: ManagerService,
        private formBuilder: FormBuilder,
        private svcNotification: NotificationService,
        private googleAnalyticsService: GoogleAnalyticsService
    ) {
        this.parametersForm = this.formBuilder.group({
            hook_price: this.hook_price,
            max_daily_consumption: this.max_daily_consumption,
        });
    }

    public ngOnInit(): void {
        this.svcManager.getManagerConfiguration().subscribe({
            next: (response) => {
                this.hook_price.setValue(response.hook_price);
                this.max_daily_consumption.setValue(response.max_daily_consumption);
                this.releaseDate = response.release_date === undefined ? undefined : new Date(response.release_date);
            },
        });
    }

    public saveParameters() {
        this.loadSave = true;
        let config: ManagerConfiguration = {
            hook_price: this.hook_price.value,
            max_daily_consumption: this.max_daily_consumption.value,
        };
        this.svcManager.updateManagerConfiguration(config).subscribe({
            next: (response) => {
                setTimeout(() => {
                    this.responseManager(response);
                    this.loadSave = false;
                    this.googleAnalyticsService.gtag('event', 'update_manager_parameters', {
                        discharge_date: response?.discharge_date,
                        hook_price: response.hook_price,
                        max_daily_consumption: response.max_daily_consumption,
                        release_date: response?.release_date,
                    });
                }, ParametersComponent.seconds);
            },
            error: (error) => {
                this.svcNotification.warning({ message: error }, 8);
                this.loadSave = false;
            },
        });
    }

    public errorValidator(entity: string) {
        switch (entity) {
            case 'hook_price':
                if (this.hook_price.hasError('required')) {
                    return 'PAGE.CONFIG.MANAGER.FORM.HOOK_PRICE.VALIDATION.REQUIRED';
                }
                return '';
            case 'max_daily_consumption':
                if (this.max_daily_consumption.hasError('required')) {
                    return 'PAGE.CONFIG.MANAGER.FORM.MAX_DAILY_CONSUMPTION.VALIDATION.REQUIRED';
                }
                return '';
            default:
                return '';
        }
    }

    private responseManager(responseManger: ManagerConfiguration) {
        this.releaseDate =
            responseManger.release_date === undefined ? undefined : new Date(responseManger.release_date);
    }
}
