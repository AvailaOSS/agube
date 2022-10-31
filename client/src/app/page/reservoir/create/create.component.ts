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
            country: new FormControl('', Validators.required),
            state: new FormControl('', Validators.required),
            province: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            village: new FormControl(''),
            municipality: new FormControl('', Validators.required),
            city_district: new FormControl('', Validators.required),
            cp: new FormControl('', Validators.required),
            street: new FormControl(''),
            number: new FormControl(''),
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
            water_meter: this.formBuilder.group({
                code: this.code,
            }),
            capacity: this.capacity,
            inletFlow: this.inletFlow,
            outletFlow: this.outletFlow,
        });
    }

    public exit() {
        this.router.navigate(['manager/reservoirs']);
    }

    public save() {
        this.loadingPost = true;

        this.onSave()!.subscribe({
            next: (response) => {
                this.resetCache();
                this.resetForm();
                this.loadingPost = false;
                this.googleAnalyticsService.gtag('event', 'create_reservoir', {
                    manager_id: response?.user_id,
                    reservoir_id: response?.id,
                    capacity: response.capacity,
                    outlet_flow: response.outlet_flow,
                    inet_flow: response.inlet_flow,
                });
            },
            error: (error) => {
                this.svcNotification.warning({ message: error });
                this.loadingPost = false;
                this.googleAnalyticsService.exception('error_reservoir_create', true);
            },
        });
    }

    public saveAndExit() {
        this.loadingPost = true;

        this.onSave()!.subscribe({
            next: (response) => {
                this.svcReservoirCache.clean();
                this.resetForm();
                this.loadingPost = false;
                this.googleAnalyticsService.gtag('event', 'create_reservoir_exit', {
                    manager_id: response?.user_id,
                    reservoir_id: response?.id,
                    capacity: response.capacity,
                    outlet_flow: response.outlet_flow,
                    inlet_flow: response.inlet_flow,
                });
                this.exit();
            },
            error: (error) => {
                this.svcNotification.warning({ message: error });
                this.loadingPost = false;
                this.googleAnalyticsService.exception('error_reservoir_create_exit', true);
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
        let steps: string[] = ['GenericFilterCreateStep', 'GenericMapCreateStep', 'GenericFormCreateStep'];
        JoyRideFunction(this.joyrideService, this.svcTranslate, steps);
    }

    private resetForm() {
        this.code.setValue('');
        this.capacity.setValue('');
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
                geolocation: this.getGeolocation(),
                user_id: this.userId,
                capacity: this.capacity.value,
                inlet_flow: this.inletFlow.value,
                outlet_flow: this.outletFlow.value,
            };
        } else {
            reservoir = {
                geolocation: this.getGeolocation(),
                water_meter: {
                    code: this.code.value,
                },
                user_id: this.userId,
                capacity: this.capacity.value,
                inlet_flow: this.inletFlow.value,
                outlet_flow: this.outletFlow.value,
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
