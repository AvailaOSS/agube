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
  UserDetail,
} from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss'],
})
export class ChangeComponent implements OnInit {
  public title: string = 'Persona';
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
  public currentPerson: UserDetail | undefined;

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

  ngOnInit(): void {
    this.svcDwelling
      .getDwelling(this.dwellingId)
      .subscribe((response) => (this.dwelling = response));
  }

  save() {
    if (this.personForm.invalid) {
      return;
    }
  }

  exit() {
    this.router.navigate(['manager/dwellings']);
  }

  saveAndExit() {
    this.save();
    this.exit();
  }

  public errorValidator(entity: string) {
    switch (entity) {
      case 'first_name':
        if (this.first_name.hasError('required')) {
          return 'Escribe el Nombre del ' + this.title;
        }
        return '';
      case 'last_name':
        if (this.last_name.hasError('required')) {
          return 'Escribe el Apellido del ' + this.title;
        }
        return '';
      case 'email':
        if (this.email.hasError('required')) {
          return 'Inserta el correo electrónico del ' + this.title;
        }
        if (this.email.hasError('email')) {
          return 'El email introducido no cumple con el formato stark@industries.com';
        }
        return '';
      case 'phone_number':
        let invalidPattern =
          'El número de contacto no cumple con el formato 196320819 o +XX 196320819';

        if (this.phone_number.hasError('required')) {
          return 'Inserta un número de contacto';
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
}
