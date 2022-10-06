import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservoirService, ReservoirCreate } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { AccountService } from '@availa/auth-fe';
import { AddressEmitter } from 'src/app/utils/address/address-emitter';
import { CreateAddress } from 'src/app/utils/address/create-address';
import { ReservoirCacheService } from 'src/app/utils/cache/reservoir-cache.service';
import { build } from 'src/app/utils/coordinates/coordinates-builder';
import { MapIconType } from 'src/app/components/map/map/configure-map';

@Component({
    selector: 'app-page-water-source-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends CreateAddress implements OnInit {
    public waterSourceForm: FormGroup | undefined;
    public code = new FormControl('');
    // FIX: REMOVE THIS OPTIONS
    public capacity = new FormControl('', [Validators.required]);
    public inletFlow = new FormControl('', [Validators.required]);
    public outletFlow = new FormControl('', [Validators.required]);

    @Input() public userId: number = -1;

    public loadingPost = false;

    constructor(
        private router: Router,
        private svcNotification: NotificationService,
        private svcWaterSource: ReservoirService,
        private svcWaterSourceCache: ReservoirCacheService,
        private svcAccount: AccountService,
        private formBuilder: FormBuilder,
        private googleAnalyticsService: GoogleAnalyticsService
    ) {
        super();
        this.googleAnalyticsService.pageView('create_waterSource', '/create_waterSource');
        this.configureMap.center.type = MapIconType.WATER_SOURCE;
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

        // get user Id to assign the waterSource as owner
        this.svcAccount.getUser().subscribe((response) => {
            this.userId = response!.user_id;
        });
    }

    public ngOnInit(): void {
        this.loadCache();
    }

    // Fix: remove this function!
    public override addressFormReceive(addressEmitter: AddressEmitter) {
        super.addressFormReceive(addressEmitter);
        this.waterSourceForm = this.formBuilder.group({
            address: addressEmitter.addressFormGroup,

            water_meter: this.formBuilder.group({
                code: this.code,
            }),
            capacity: this.capacity,
            inletFlow: this.inletFlow,
            outletFlow: this.outletFlow,
        });
    }
    // public override addressFormReceive(addressEmitter: AddressEmitter) {
    //     super.addressFormReceive(addressEmitter);
    //     this.waterSourceForm = this.formBuilder.group({
    //         address: addressEmitter.addressFormGroup

    //     });
    // }

    public exit() {
        this.router.navigate(['manager/waterSources']);
    }

    public save() {
        this.loadingPost = true;

        this.onSave()!.subscribe({
            next: (response) => {
                this.resetCache();
                this.resetForm();
                this.loadingPost = false;
                this.googleAnalyticsService.gtag('event', 'create_water_source', {
                    manager_id: response?.user_id,
                    Water_source_id: response?.id
                });
            },
            error: (error) => {
                this.svcNotification.warning({ message: error });
                this.loadingPost = false;
                this.googleAnalyticsService.exception('error_water_source_create', true);
            },
        });
    }

    public saveAndExit() {
        this.loadingPost = true;

        this.onSave()!.subscribe({
            next: (response) => {
                this.svcWaterSourceCache.clean();
                this.resetForm();
                this.loadingPost = false;
                this.googleAnalyticsService.gtag('event', 'create_waterSource_exit', {
                    manager_id: response?.user_id,
                    waterSource_id: response?.id
                });
                this.exit();
            },
            error: (error) => {
                this.svcNotification.warning({ message: error });
                this.loadingPost = false;
                this.googleAnalyticsService.exception('error_waterSource_create_exit', true);
            },
        });
    }

    public errorValidator(entity: string) {
        switch (entity) {
            case 'code':
                if (this.code.hasError('required')) {
                    return 'PAGE.WATERSOURCE.CREATE.WATER_METER_CODE.VALIDATION.REQUIRED';
                }
                return '';
            default:
                return '';
        }
    }

    private resetForm() {
        this.code.setValue('');
    }

    private onSave() {
        if (!this.waterSourceForm || this.waterSourceForm.invalid) {
            return;
        }

        let waterSource: ReservoirCreate;
        if (this.code.value.length === 0) {
            waterSource = {
                geolocation: this.getGeolocation(),
                user_id: this.userId,
                // FIX WATERMETERCREATE
                capacity: this.capacity.value,
                inlet_flow: this.inletFlow.value,
                outlet_flow: this.outletFlow.value,
            };
        } else {
            waterSource = {
                geolocation: this.getGeolocation(),
                water_meter: {
                    code: this.code.value,
                },
                user_id: this.userId,
                // FIX WATERMETERCREATE
                capacity: this.capacity.value,
                inlet_flow: this.inletFlow.value,
                outlet_flow: this.outletFlow.value,
            };
        }
        return this.svcWaterSource.createReservoir(waterSource);
    }

    private loadCache() {
        this.svcWaterSourceCache.get().then((response) => {
            if (response && response.length > 0) {
                this.configureMap.otherPoints = response.map((waterSource) => build(waterSource));
            }
        });
    }

    private resetCache() {
        this.svcWaterSourceCache.clean();
        this.loadCache();
    }
}
