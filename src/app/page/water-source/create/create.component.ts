import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpringSource, SpringSourceService } from '@availa/agube-rest-api';
import { AccountService } from '@availa/auth-fe';
import { NotificationService } from '@availa/notification';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { MapIconType } from 'src/app/components/map/map/configure-map';
import { AddressEmitter } from 'src/app/utils/address/address-emitter';
import { CreateAddress } from 'src/app/utils/address/create-address';
import { build } from 'src/app/utils/coordinates/coordinates-builder';

@Component({
    selector: 'app-page-water-source-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends CreateAddress implements OnInit {
    public waterSourceForm: FormGroup | undefined;
    public code = new FormControl('');

    @Input() public userId: number = -1;

    public loadingPost = false;

    constructor(
        private router: Router,
        private svcNotification: NotificationService,
        private svcWaterSource: SpringSourceService,
        private svcWaterSourceCache: SpringSourceService,
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

    public override addressFormReceive(addressEmitter: AddressEmitter) {
        super.addressFormReceive(addressEmitter);
        this.waterSourceForm = this.formBuilder.group({
            address: addressEmitter.addressFormGroup,
        });
    }

    public exit() {
        this.router.navigate(['manager/watersources']);
    }

    public save() {
        this.loadingPost = true;

        this.onSave()!.subscribe({
            next: (response) => {
                this.resetCache();
                this.resetForm();
                this.loadingPost = false;
                this.googleAnalyticsService.gtag('event', 'create_water_source', {
                    Water_source_id: response?.id,
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

                this.resetForm();
                this.loadingPost = false;
                this.googleAnalyticsService.gtag('event', 'create_waterSource_exit', {
                    waterSource_id: response?.id,
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

        let waterSource: SpringSource;
        if (this.code.value.length === 0) {
            waterSource = {
                geolocation: this.getGeolocation(),
            };
        } else {
            waterSource = {
                geolocation: this.getGeolocation(),
            };
        }
        return this.svcWaterSource.createSpringSource(waterSource);
    }

    private loadCache() {
        this.svcWaterSourceCache.getSpringSources().subscribe((response) => {
            if (response && response.length > 0) {
                this.configureMap.otherPoints = response.map((waterSource) => build(waterSource));
            }
        });
    }

    private resetCache() {
        this.loadCache();
    }
}
