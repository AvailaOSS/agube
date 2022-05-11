import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservoirService, ReservoirCreate } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { AccountService } from '@availa/auth-fe';
import { AddressEmitter } from 'src/app/utils/address/address-emitter';
import { CreateAddress } from 'src/app/utils/address/create-address';
import { map, Observable, startWith } from 'rxjs';

@Component({
    selector: 'app-page-reservoir-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends CreateAddress {
    public reservoirForm: FormGroup | undefined;
    public code = new FormControl('', [Validators.required]);
    public capacity = new FormControl('', [Validators.required]);
    public inletFlow = new FormControl('', [Validators.required]);
    public outletFlow = new FormControl('', [Validators.required]);

    @Input() public userId: number = -1;

    public loadingPost = false;

    myControl = new FormControl();
    optionsName: string[] = ['One', 'Two', 'Three'];
    public filteredOptions: Observable<string[]> = new Observable();

    constructor(
        private router: Router,
        private svcNotification: NotificationService,
        private svcReservoir: ReservoirService,
        private svcAccount: AccountService,
        private formBuilder: FormBuilder
    ) {
        super();
        this.configureMap.height = '400px';
        this.svcAccount.getUser().subscribe((response) => {
            this.userId = response!.user_id;
        });
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

    public save() {
        this.loadingPost = true;

        this.onSave()!.subscribe({
            next: (response) => {
                this.resetForm();
                this.loadingPost = false;
            },
            error: (error) => {
                this.svcNotification.warning({ message: error });
                this.loadingPost = false;
            },
        });
    }

    public exit() {
        this.router.navigate(['manager/reservoirs']);
    }

    public saveAndExit() {
        this.loadingPost = true;

        this.onSave()!.subscribe({
            next: (response) => {
                this.resetForm();
                this.loadingPost = false;
                this.exit();
            },
            error: (error) => {
                this.svcNotification.warning({ message: error });
                this.loadingPost = false;
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

        let reservoir: ReservoirCreate = {
            geolocation: this.getGeolocation(),
            water_meter: {
                code: this.code.value,
            },
            user_id: this.userId,
            capacity: this.capacity.value,
            inlet_flow: this.inletFlow.value,
            outlet_flow: this.outletFlow.value,
        };

        return this.svcReservoir.createReservoir(reservoir);
    }
}
