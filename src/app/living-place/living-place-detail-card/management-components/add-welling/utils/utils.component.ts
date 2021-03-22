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
  public isHidden = false;
  public isAllSave = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly svcCreateNewdWelling: DwellingService
  ) {}

  public goToControlPanel(): void {
    this.router.navigate(['/control-panel']);
  }
  public toggle(): void {
    this.isHidden = !this.isHidden;
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
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  public onSubmit(): void {
    this.submitted = true;
    this.isAllSave = true;
    console.log(this.registerForm.value);
    this.sendForm.emit(this.registerForm.value);
  }
}
