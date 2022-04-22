import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  DwellingService,
  DwellingCreate,
  UserCreate,
} from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss'],
})
export class ChangeComponent implements OnInit {
  public title: string = 'PERSON.PERSON';
  public typePerson = { typePerson: this.title };
  public personForm: FormGroup;
  public first_name = new FormControl('', [Validators.required]);
  public last_name = new FormControl('', [Validators.required]);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public phone_number = new FormControl('', [
    Validators.required,
    Validators.pattern('[- +()0-9]+'),
    Validators.minLength(9),
    Validators.maxLength(13),
  ]);
  // public town = new FormControl('', [Validators.required]);
  // public street = new FormControl('', [Validators.required]);
  // public number = new FormControl('', [Validators.required]);
  // public flat = new FormControl('', []);
  // public gate = new FormControl('', [Validators.required]);

  public dwelling: DwellingCreate | undefined;
  public currentPerson: UserCreate | undefined;

  public dwellingId: number = -1;

  public loadingPost = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public svcNotification: NotificationService,
    public svcDwelling: DwellingService
  ) {
    this.dwelling = undefined;
    this.currentPerson = undefined;
    this.route.queryParams.subscribe((params) => {
      this.dwellingId = params['dwellingId'];
    });

    this.personForm = this.formBuilder.group({
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone_number: this.phone_number,
      // town: this.town,
      // street: this.street,
      // number: this.number,
      // flat: this.flat,
      // gate: this.gate,
    });
  }

  public ngOnInit(): void {
    this.svcDwelling
      .getDwelling(this.dwellingId)
      .subscribe((response) => (this.dwelling = response));
  }

  public save() {
    if (this.personForm.invalid) {
      return;
    }
  }

  public exit() {
    this.router.navigate(['manager/dwellings']);
  }

  public saveAndExit() {
    this.save();
    this.exit();
  }

  public errorValidator(entity: string) {
    switch (entity) {
      case 'first_name':
        if (this.first_name.hasError('required')) {
          return 'PERSON.CHANGE.FORM.DATA.FIRST_NAME.VALIDATION.' + this.title;
        }
        return '';
      case 'last_name':
        if (this.last_name.hasError('required')) {
          return 'PERSON.CHANGE.FORM.DATA.LAST_NAME.VALIDATION.' + this.title;
        }
        return '';
      case 'email':
        if (this.email.hasError('required')) {
          return (
            'PERSON.CHANGE.FORM.CONTACT_INFO.EMAIL.VALIDATION.REQUIRED.' + this.title
          );
        }
        if (this.email.hasError('email')) {
          return 'PERSON.CHANGE.FORM.CONTACT_INFO.EMAIL.VALIDATION.EMAIL_FORMAT';
        }
        return '';
      case 'phone_number':
        let invalidPattern =
          'PERSON.CHANGE.FORM.CONTACT_INFO.CONTACT_PHONE.VALIDATION.REQUIRED';

        if (this.phone_number.hasError('required')) {
          return 'PERSON.CHANGE.FORM.CONTACT_INFO.CONTACT_PHONE.VALIDATION.PHONE_FORMAT';
        }
        if (this.phone_number.hasError('pattern')) {
          return invalidPattern;
        }
        if (this.phone_number.hasError('minlength')) {
          return invalidPattern;
        }
        if (this.phone_number.hasError('maxlength')) {
          return invalidPattern;
        }
        return '';
      default:
        return '';
    }
  }

  protected resetForm() {
    this.first_name.setValue('');
    this.last_name.setValue('');
    this.email.setValue('');
    this.phone_number.setValue('');
  }
}
