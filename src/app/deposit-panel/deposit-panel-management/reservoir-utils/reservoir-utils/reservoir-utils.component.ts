import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { isUndefined } from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-reservoir-utils',
  templateUrl: './reservoir-utils.component.html',
  styleUrls: ['./reservoir-utils.component.scss']
})
export class ReservoirUtilsComponent implements OnInit {
  @Input() titleCard: string;
  @Input() formDataConfiguration: BehaviorSubject<any> = new BehaviorSubject(5);
  @Input() isHiddenResident = false;
  @Input() isHiddenAddress = false;
  @Input() isHiddenBank = false;
  @Input() isHiddenOwner = false;
  @Input() isHiddenCount = false;
  @Input() ownerTitle = 'Alta Depósito';
  @Input() residentTitle = 'Alta Residente';
  @Input() error = false;

  @Output() sendForm: EventEmitter<any> = new EventEmitter<any>();

  public registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  public goToControlPanel(): void {
    this.router.navigate(['/control-panel']);
  }
  public toggle(): void {
    this.isHiddenResident = !this.isHiddenResident;
  }
  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
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
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  public onSubmit(): void {
    this.sendForm.emit(this.registerForm.value);
  }
}
