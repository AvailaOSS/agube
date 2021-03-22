import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DwellingService } from 'apiaux/agube-rest-api-lib/src/public-api';
import { isUndefined } from 'lodash';
import { BehaviorSubject } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss'],
})
export class UtilsComponent implements OnInit {
  @Input() titleCard: string;
  @Input() formDataConfiguration: BehaviorSubject<any> = new BehaviorSubject(5);
  @Input() isHiddenResident?: boolean = false;
  @Input() isHiddenAddress?: boolean = false;
  @Input() isHiddenBank?: boolean = false;
  @Input() isHiddenOwner?: boolean = false;
  @Input() isHiddenCount?: boolean = false;
  @Input() ownerTitle?: string = 'Alta Propietario';
  @Input() residentTitle?: string = 'Alta Residente';

  @Output() sendForm: EventEmitter<any> = new EventEmitter<any>();
  hide = true;
  public registerForm: FormGroup;
  public loading = false;
  public submitted = false;
  public error: string;
  public formIdentification: number;
  public payType: string;
  requestSend: boolean;
  errorInformation: boolean;
  public pagador = false;
  public residente = false;
  public isAllSave = false;
  public email: string;
  public address: string;
  public number: string;
  public flat: string;
  public gate: string;
  public town: string;
  public numberBank: string;
  public username: string;
  public first_name: string;
  public last_name: string;
  public phones: string;
  public addressOwner: string;
  public code: string;
  public usernameRes: string;
  public first_nameRes: string;
  public last_nameRes: string;
  public emailRes: string;
  public phonesRes: string;
  public addressRes: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  public goToControlPanel(): void {
    this.router.navigate(['/control-panel']);
  }
  public toggle(): void {
    this.isHiddenResident = !this.isHiddenResident;
  }
  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      address: ['', Validators.required],
      number: ['', Validators.required],
      flat: ['', Validators.required],
      gate: ['', Validators.required],
      town: ['', Validators.required],
      numberBank: ['', Validators.required],
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      phones: ['', Validators.required],
      addressOwner: ['', Validators.required],
      code: ['', Validators.required],
      pagador: [''],
      residente: [''],
      usernameRes: ['', Validators.required],
      first_nameRes: ['', Validators.required],
      last_nameRes: ['', Validators.required],
      emailRes: ['', Validators.required],
      phonesRes: ['', Validators.required],
      addressRes: ['', Validators.required],
      pagadorResidente: [''],
    });

    this.formDataConfiguration.subscribe((value) => {
      //Todo: MEJORAR ESTO "!!"

      this.numberBank = value.iban;
      if (!isUndefined(value) && value !== 5) {
        this.code = value.code;

        this.number = value.user.address[0].number;
        this.flat = value.user.address[0].flat;
        this.gate = value.user.address[0].gate;
        this.town = value.user.address[0].address.town;

        this.email = value.user.email;
        this.username = value.user.username;
        this.first_name = value.user.first_name;
        this.last_name = value.user.last_name;
        this.phones = value.user.phones[0].phone_number;

        this.usernameRes = value.user.username;
        this.first_nameRes = value.user.first_name;
        this.last_nameRes = value.user.last_name;
        this.phonesRes = value.user.phones[0].phone_number;
        this.emailRes = value.user.email;
        this.addressRes = value.user.address[0].address.street || '';
        this.addressOwner = value.user.address[0].address.street || '';
      }
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  public onSubmit(): void {
    //TODO :  Controlar la emisión , cuando es undefined (vacio)

    this.sendForm.emit(this.registerForm.value);
  }
}
