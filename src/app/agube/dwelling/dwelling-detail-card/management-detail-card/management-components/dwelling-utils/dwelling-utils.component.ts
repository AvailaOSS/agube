import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '@availa/notification';
import { isUndefined } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { AgubeRoute } from '../../../../../agube-route';

@Component({
  selector: 'app-dwelling-utils',
  templateUrl: './dwelling-utils.component.html',
  styleUrls: ['./dwelling-utils.component.scss'],
})
export class DwellingUtilsComponent implements OnInit {
  @Input() titleCard: string;
  @Input() formDataConfiguration: BehaviorSubject<any> = new BehaviorSubject(5);
  @Input() isHiddenResident = false;
  @Input() isHiddenAddress = false;
  @Input() isHiddenBank = false;
  @Input() isHiddenOwner = false;
  @Input() isHiddenCount = false;
  @Input() isHiddenResidentCheck = false;
  @Input() ownerTitle = 'Alta Propietario';
  @Input() residentTitle = 'Alta Residente';
  @Input() error = false;
  @Input() errorMessage: any = [];

  @Output() sendForm: EventEmitter<any> = new EventEmitter<any>();

  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public alertService: NotificationService
  ) {}

  public ngOnInit(): void {
    this.registerForm = this.initializeForm();
    this.initializeFormWatcher();

    if (this.isHiddenAddress && this.isHiddenOwner && !this.isHiddenResident) {
      this.validatorResident();
    }

    if (this.isHiddenResident && this.isHiddenAddress && !this.isHiddenOwner) {
      this.validatorOwner();
    }

    if (
      this.isHiddenResident &&
      this.isHiddenAddress &&
      this.isHiddenBank &&
      this.isHiddenOwner
    ) {
      this.validatorWaterMeter();
    }
  }

  public goToControlPanel(): void {
    this.router.navigate([AgubeRoute.DWELLING]);
  }

  public toggle(): void {
    this.isHiddenResident = !this.isHiddenResident;
    if (this.isHiddenResident) {
      this.registerForm.controls.first_nameRes.disable();
      this.registerForm.controls.last_nameRes.disable();
      this.registerForm.controls.phonesRes.disable();
      this.registerForm.controls.addressRes.disable();
      this.registerForm.controls.usernameRes.disable();
      this.registerForm.controls.emailRes.disable();
    } else {
      this.registerForm.controls.first_nameRes.enable();
      this.registerForm.controls.last_nameRes.enable();
      this.registerForm.controls.phonesRes.enable();
      this.registerForm.controls.addressRes.enable();
      this.registerForm.controls.usernameRes.enable();
      this.registerForm.controls.emailRes.enable();
    }
  }

  // tslint:disable-next-line: typedef
  get f() {
    return this.registerForm.controls;
  }

  public onSubmit(): void {
    this.sendForm.emit(this.registerForm.value);
  }

  private validatorResident(): void {
    this.registerForm.controls.address.disable();
    this.registerForm.controls.username.disable();
    this.registerForm.controls.first_name.disable();
    this.registerForm.controls.last_name.disable();
    this.registerForm.controls.email.disable();
    this.registerForm.controls.phones.disable();
    this.registerForm.controls.addressOwner.disable();
    this.registerForm.controls.code.disable();
    this.registerForm.controls.numberBank.disable();
  }

  private validatorOwner(): void {
    this.registerForm.controls.first_nameRes.disable();
    this.registerForm.controls.last_nameRes.disable();
    this.registerForm.controls.phonesRes.disable();
    this.registerForm.controls.addressRes.disable();
    this.registerForm.controls.usernameRes.disable();
    this.registerForm.controls.emailRes.disable();
    this.registerForm.controls.address.disable();
    this.registerForm.controls.code.disable();
    this.registerForm.controls.numberBank.disable();
  }

  private validatorWaterMeter(): void {
    this.registerForm.controls.first_nameRes.disable();
    this.registerForm.controls.last_nameRes.disable();
    this.registerForm.controls.phonesRes.disable();
    this.registerForm.controls.addressRes.disable();
    this.registerForm.controls.usernameRes.disable();
    this.registerForm.controls.emailRes.disable();
    this.registerForm.controls.address.disable();
    this.registerForm.controls.number.disable();
    this.registerForm.controls.flat.disable();
    this.registerForm.controls.gate.disable();
    this.registerForm.controls.town.disable();
    this.registerForm.controls.numberBank.disable();
    this.registerForm.controls.username.disable();
    this.registerForm.controls.first_name.disable();
    this.registerForm.controls.last_name.disable();
    this.registerForm.controls.email.disable();
    this.registerForm.controls.phones.disable();
    this.registerForm.controls.addressOwner.disable();
    this.registerForm.controls.code.enable();
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      address: new FormControl(),
      number: new FormControl(),
      flat: new FormControl(),
      gate: new FormControl(),
      town: new FormControl(),
      numberBank: new FormControl(),
      username: new FormControl(),
      first_name: new FormControl(),
      last_name: new FormControl(),
      email: new FormControl(),
      phones: new FormControl(),
      addressOwner: new FormControl(),
      code: new FormControl(),
      pagador: [''],
      resident: new FormControl(),
      usernameRes: new FormControl(),
      first_nameRes: new FormControl(),
      last_nameRes: new FormControl(),
      emailRes: new FormControl(),
      phonesRes: new FormControl(),
      addressRes: new FormControl(),
    });
  }

  private initializeFormWatcher(): void {
    this.formDataConfiguration.subscribe((value) => {
      if (!isUndefined(value) && value !== 5) {
        this.registerForm.get('numberBank').setValue(value.iban);
        this.registerForm.get('code').setValue(value.code);

        if (!isUndefined(value.user)) {
          this.registerForm
            .get('number')
            .setValue(value.user.address[0].number);
          this.registerForm.get('flat').setValue(value.user.address[0].flat);
          this.registerForm.get('gate').setValue(value.user.address[0].gate);
          this.registerForm
            .get('town')
            .setValue(value.user.address[0].address.town);
          this.registerForm.get('first_name').setValue(value.user.first_name);
          this.registerForm.get('last_name').setValue(value.user.last_name);
          this.registerForm.get('username').setValue(value.user.username);
          this.registerForm.get('email').setValue(value.user.email);
        }

        if (!isUndefined(value.user)) {
          this.registerForm
            .get('addressOwner')
            .setValue(value.user.address[0].address.street);
          this.registerForm
            .get('phones')
            .setValue(value.user.phones[0].phone_number);
          this.registerForm
            .get('addressRes')
            .setValue(value.user.address[0].address.street);
          this.registerForm
            .get('phonesRes')
            .setValue(value.user.phones[0].phone_number);

          this.registerForm
            .get('first_nameRes')
            .setValue(value.user.first_name);
          this.registerForm.get('last_nameRes').setValue(value.user.last_name);
          this.registerForm.get('usernameRes').setValue(value.user.username);
          this.registerForm.get('emailRes').setValue(value.user.email);
        }
      }
    });
  }
}
