import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DwellingCreate, DwellingService } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { JoyrideService } from 'ngx-joyride';
import { AddressEmitter } from 'src/app/utils/address/address-emitter';
import { CreateAddress } from 'src/app/utils/address/create-address';
import { DwellingCacheService } from 'src/app/utils/cache/dwelling-cache.service';
import { build } from 'src/app/utils/coordinates/coordinates-builder';
import { JoyRideFunction } from 'src/app/utils/joyride/joyride';

@Component({
    selector: 'app-page-dwelling-create',
    styleUrls: ['./create.component.scss'],
    templateUrl: './create.component.html',
})
export class CreateComponent extends CreateAddress implements OnInit {
    public dwellingForm: FormGroup | undefined;
    public code = new FormControl('');

    public loadingPost = false;

    constructor(
        private router: Router,
        private svcNotification: NotificationService,
        private svcDwelling: DwellingService,
        private svcDwellingCache: DwellingCacheService,
        private formBuilder: FormBuilder,
        private googleAnalyticsService: GoogleAnalyticsService,
        private svcTranslate: TranslateService,
        private readonly joyrideService: JoyrideService
    ) {
        super();

        this.googleAnalyticsService.pageView('/create_dwelling', 'create_dwelling');
    }

    ngOnInit(): void {
        this.loadCache();
    }

    public override addressFormReceive(addressEmitter: AddressEmitter) {
        super.addressFormReceive(addressEmitter);
        this.dwellingForm = this.formBuilder.group({
            address: addressEmitter.addressFormGroup,
            water_meter: this.formBuilder.group({
                code: this.code,
            }),
        });
    }

    public exit() {
        this.router.navigate(['manager/dwellings']);
    }

    public save() {
        this.loadingPost = true;

        this.onSave()!.subscribe({
            next: (response) => {
                this.resetCache();
                this.resetForm();
                this.loadingPost = false;
                this.googleAnalyticsService.gtag('event', 'create_dwelling', {
                    manager_id: response.id,
                    water_meter: response.water_meter,
                    street: response.geolocation.address?.road,
                    city: response.geolocation.address.city,
                    latitude: response.geolocation.latitude,
                    longitude: response.geolocation.longitude,
                    zoom: response.geolocation.zoom,
                    horizontal_degree: response.geolocation.horizontal_degree,
                    vertical_degree: response.geolocation.vertical_degree,
                    number: response.geolocation.number,
                    flat: response.geolocation.flat,
                    gate: response.geolocation.gate,
                });
            },
            error: (error) => {
                this.svcNotification.warning({ message: error });
                this.loadingPost = false;
                this.googleAnalyticsService.exception('error_dwelling_create', true);
            },
        });
    }

    public saveAndExit() {
        this.loadingPost = true;

        this.onSave()!.subscribe({
            next: (response) => {
                this.svcDwellingCache.clean();
                this.resetForm();
                this.loadingPost = false;
                this.googleAnalyticsService.gtag('event', 'create_dwelling_exit', {
                    manager_id: response?.id,
                    water_meter: response.water_meter,
                    street: response.geolocation.address?.road,
                    city: response.geolocation.address.city,
                    latitude: response.geolocation.latitude,
                    longitude: response.geolocation.longitude,
                    zoom: response.geolocation.zoom,
                    horizontal_degree: response.geolocation?.horizontal_degree,
                    vertical_degree: response.geolocation?.vertical_degree,
                    number: response.geolocation?.number,
                    flat: response.geolocation?.flat,
                    gate: response.geolocation?.gate,
                });
                this.exit();
            },
            error: (error) => {
                var message = JSON.stringify(error.error);
                if (error.status === 403) {
                    // FIXME: no dynamic language detector
                    this.svcTranslate
                        .get('GENERAL.MANAGER.ERRORS.LIMIT_EXCEEDED')
                        .subscribe((response) => (message = response));
                }
                this.svcNotification.warning({ message: message });
                this.loadingPost = false;
                this.googleAnalyticsService.exception('error_dwelling_create', true);
            },
        });
    }

    public errorValidator(entity: string) {
        switch (entity) {
            case 'code':
                if (this.code.hasError('required')) {
                    return 'PAGE.DWELLING.CREATE.CODE_COUNTER.VALIDATION';
                }
                return '';
            default:
                return '';
        }
    }

    public tour() {
        let steps: string[] = ['GenericFilterCreateStep', 'GenericMapCreateStep', 'GenericFormCreateStep'];

        JoyRideFunction(this.joyrideService, this.svcTranslate, steps);
    }

    private resetForm() {
        this.resetChildForm = !this.resetChildForm;
        this.code.setValue('');
    }

    private onSave() {
        let dwelling: DwellingCreate;
        if (this.code.value.length === 0) {
            dwelling = {
                geolocation: this.getGeolocation(),
            };
        } else {
            dwelling = {
                geolocation: this.getGeolocation(),
                water_meter: {
                    code: this.code.value,
                },
            };
        }

        return this.svcDwelling.createDwelling(dwelling);
    }

    private loadCache() {
        this.svcDwellingCache.get().then((response) => {
            if (response && response.length > 0) {
                this.configureMap.otherPoints = response.map((dwelling) => build(dwelling));
            }
        });
    }

    private resetCache() {
        this.svcDwellingCache.clean();
        this.loadCache();
    }
}
