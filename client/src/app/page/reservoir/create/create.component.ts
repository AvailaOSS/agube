import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservoirService, ReservoirCreate } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { AddressEmitter } from 'src/app/utils/address/address-emitter';
import { CreateAddress } from 'src/app/utils/address/create-address';
import { ReservoirCacheService } from 'src/app/utils/cache/reservoir-cache.service';
import { build } from 'src/app/utils/coordinates/coordinates-builder';
import { MapIconType } from 'src/app/components/map/map/configure-map';
import { JoyRideFunction } from 'src/app/utils/joyride/joyride';
import { JoyrideService } from 'ngx-joyride';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../../auth/login/service/account.service';

@Component({
    selector: 'app-page-reservoir-create',
    styleUrls: ['./create.component.scss'],
    templateUrl: './create.component.html',
})
export class CreateComponent extends CreateAddress implements OnInit {
    public reservoirForm: FormGroup | undefined;
    public code = new FormControl('');
    public capacity = new FormControl('', [Validators.required]);
    public inletFlow = new FormControl('', [Validators.required]);
    public outletFlow = new FormControl('', [Validators.required]);

    @Input() public userId: number = -1;

    public loadingPost = false;

    constructor(
        private router: Router,
        private svcNotification: NotificationService,
        private svcReservoir: ReservoirService,
        private svcReservoirCache: ReservoirCacheService,
        private svcAccount: AccountService,
        private formBuilder: FormBuilder,
        private googleAnalyticsService: GoogleAnalyticsService,
        private svcTranslate: TranslateService,
        private readonly joyrideService: JoyrideService
    ) {
        super();
        this.googleAnalyticsService.pageView('create_reservoir', '/create_reservoir');
        this.configureMap.center.type = MapIconType.RESERVOIR;
        // configure address form
        this.addressInputForm = {
            city: new FormControl('', Validators.required),
            city_district: new FormControl('', Validators.required),
            country: new FormControl('', Validators.required),
            cp: new FormControl('', Validators.required),
            municipality: new FormControl('', Validators.required),
            number: new FormControl(''),
            province: new FormControl('', Validators.required),
            state: new FormControl('', Validators.required),
            street: new FormControl(''),
            village: new FormControl(''),
        };

        // configure map height
        this.setMapResolution('220px', '500px', '1020px');

        // get user Id to assign the reservoir as owner
        this.svcAccount.getUser().subscribe((response) => {
            this.userId = response!.user_id;
        });
    }

    public ngOnInit(): void {
        this.loadCache();
    }

    public override addressFormReceive(addressEmitter: AddressEmitter) {
        super.addressFormReceive(addressEmitter);
        this.reservoirForm = this.formBuilder.group({
            address: addressEmitter.addressFormGroup,
            capacity: this.capacity,
            inletFlow: this.inletFlow,
            outletFlow: this.outletFlow,
            water_meter: this.formBuilder.group({
                code: this.code,
            }),
        });
    }

    public exit() {
        this.router.navigate(['manager/reservoirs']);
    }

    public save() {
        this.loadingPost = true;

        this.onSave()!.subscribe({
            error: (error) => {
                this.svcNotification.warning({ message: error });
                this.loadingPost = false;
                this.googleAnalyticsService.exception('error_reservoir_create', true);
            },
            next: (response) => {
                this.resetCache();
                this.resetForm();
                this.loadingPost = false;
                this.googleAnalyticsService.gtag('event', 'create_reservoir', {
                    capacity: response.capacity,
                    inlet_flow: response.inlet_flow,
                    manager_id: response?.user_id,
                    outlet_flow: response.outlet_flow,
                    reservoir_id: response?.id,
                });
            },
        });
    }

    public saveAndExit() {
        this.loadingPost = true;

        this.onSave()!.subscribe({
            error: (error) => {
                this.svcNotification.warning({ message: error });
                this.loadingPost = false;
                this.googleAnalyticsService.exception('error_reservoir_create_exit', true);
            },
            next: (response) => {
                this.svcReservoirCache.clean();
                this.resetForm();
                this.loadingPost = false;
                this.googleAnalyticsService.gtag('event', 'create_reservoir_exit', {
                    capacity: response.capacity,
                    inlet_flow: response.inlet_flow,
                    manager_id: response?.user_id,
                    outlet_flow: response.outlet_flow,
                    reservoir_id: response?.id,
                });
                this.exit();
            },
        });
    }

    public errorValidator(entity: string) {
        switch (entity) {
            case 'code':
                if (this.code.hasError('required')) {
                    return 'PAGE.RESERVOIR.CREATE.WATER_METER_CODE.VALIDATION.REQUIRED';
                }
                return '';
            case 'capacity':
                if (this.capacity.hasError('required')) {
                    return 'PAGE.RESERVOIR.CREATE.CAPACITY.VALIDATION.REQUIRED';
                }
                return '';
            case 'inletFlow':
                if (this.inletFlow.hasError('required')) {
                    return 'PAGE.RESERVOIR.CREATE.INLET_FLOW.VALIDATION.REQUIRED';
                }
                return '';
            case 'outletFlow':
                if (this.outletFlow.hasError('required')) {
                    return 'PAGE.RESERVOIR.CREATE.OUTLET_FLOW.VALIDATION.REQUIRED';
                }
                return '';
            default:
                return '';
        }
    }

    // Call joyRide to pass all variables and do the tour
    public tour() {
        const steps: string[] = ['GenericFilterCreateStep', 'GenericMapCreateStep', 'GenericFormCreateStep'];
        JoyRideFunction(this.joyrideService, this.svcTranslate, steps);
    }

    private resetForm() {
        this.capacity.setValue('');
        this.code.setValue('');
        this.outletFlow.setValue('');
        this.inletFlow.setValue('');
    }

    private onSave() {
        if (!this.reservoirForm || this.reservoirForm.invalid) {
            return;
        }

        let reservoir: ReservoirCreate;
        if (this.code.value.length === 0) {
            reservoir = {
                capacity: this.capacity.value,
                geolocation: this.getGeolocation(),
                inlet_flow: this.inletFlow.value,
                outlet_flow: this.outletFlow.value,
                user_id: this.userId,
            };
        } else {
            reservoir = {
                capacity: this.capacity.value,
                geolocation: this.getGeolocation(),
                inlet_flow: this.inletFlow.value,
                outlet_flow: this.outletFlow.value,
                user_id: this.userId,
                water_meter: {
                    code: this.code.value,
                },
            };
        }
        return this.svcReservoir.createReservoir(reservoir);
    }

    // load cache
    private loadCache() {
        this.svcReservoirCache.get().then((response) => {
            if (response && response.length > 0) {
                this.configureMap.otherPoints = response.map((reservoir) => build(reservoir));
            }
        });
    }

    // reset
    private resetCache() {
        this.svcReservoirCache.clean();
        this.loadCache();
    }
}
