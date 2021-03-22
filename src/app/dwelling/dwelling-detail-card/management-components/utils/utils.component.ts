import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DwellingService } from 'apiaux/agube-rest-api-lib/src/public-api';
<<<<<<< HEAD
=======
import { BehaviorSubject } from 'rxjs';
import { isUndefined } from 'lodash';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
>>>>>>> 92509f4... feat: add contador, vivienda, residente , pagador, propietario

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
<<<<<<< HEAD
=======
  @Input() formDataConfiguration: BehaviorSubject<any> = new BehaviorSubject(5);

  @Input() isHiddenResident?: boolean = false;
  @Input() isHiddenAddress?: boolean = false;
  @Input() isHiddenBank?: boolean = false;
  @Input() isHiddenOwner?: boolean = false;
  @Input() ownerTitle?: string = 'Alta Propietario';
  @Input() residentTitle?: string = 'Alta Residente';

>>>>>>> 92509f4... feat: add contador, vivienda, residente , pagador, propietario
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
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly svcCreateNewDWelling: DwellingService
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
      address2: ['', Validators.required],
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
<<<<<<< HEAD
=======

    this.formDataConfiguration.subscribe((value) => {

      if (!isUndefined(value) && value !== 5) {
        this.code = value.code;
        this.address = value.user.address[0].address.street || '';
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
      }
    });
>>>>>>> 92509f4... feat: add contador, vivienda, residente , pagador, propietario
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  public onSubmit(): void {
    this.submitted = true;
    this.isAllSave = true;
<<<<<<< HEAD
    console.log(this.registerForm.value);
=======


>>>>>>> f70d71a... Merge branch 'feature/redirection' into develop
    this.sendForm.emit(this.registerForm.value);

  }
}
