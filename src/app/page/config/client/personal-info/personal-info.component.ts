import { AccountService } from '@availa/auth-fe';
import { UserService } from '@availa/agube-rest-api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotificationService } from '@availa/notification';
import { PersonalInfo } from './personal-info';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['../client-page.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  public loadSave: boolean = false;
  public personalForm: FormGroup;
  public username = new FormControl('', [Validators.required]);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public first_name = new FormControl('', [Validators.required]);
  public last_name = new FormControl('', [Validators.required]);

  public releaseDate: Date | undefined = undefined;

  private logOut: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private svcNotification: NotificationService,
    private svcAccount: AccountService,
    private svcUser: UserService
  ) {
    this.personalForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name
    });
  }

  ngOnInit(): void {
    this.logOut = this.svcAccount.getUser().subscribe((userResponse) => {
      if (!userResponse) {
        return;
      }

      this.svcUser
        .getUserDetail(userResponse!.user_id)
        .subscribe((response) => {
          this.username.setValue(userResponse?.username);
          this.email.setValue(response.email);
          this.first_name.setValue(response.first_name);
          this.last_name.setValue(response.last_name);
        });
    });
  }

  saveForm() {
    this.loadSave = true;
    let personalInfo: PersonalInfo = {
      email: this.username.value,
      first_name: this.username.value,
      last_name: this.username.value,
      username: this.username.value,
    };

    //FIXME: save data with service and progress bar
    this.svcNotification.info({
      message: 'Funcionalidad todavía no implementada ' + personalInfo,
    });
    this.loadSave = false;
  }

  public errorValidator(entity: string) {
    switch (entity) {
      case 'username':
        if (this.username.hasError('required')) {
          return 'PAGE.CONFIG.CLIENT.PERSONAL-INFO.USERNAME.VALIDATION.REQUIRED';
        }
        return '';
      case 'first_name':
        if (this.first_name.hasError('required')) {
          return 'PAGE.CONFIG.CLIENT.PERSONAL-INFO.FIRST_NAME.VALIDATION.REQUIRED';
        }
        return '';
      case 'last_name':
        if (this.last_name.hasError('required')) {
          return 'PAGE.CONFIG.CLIENT.PERSONAL-INFO.LAST_NAME.VALIDATION.REQUIRED';
        }
        return '';
      case 'email':
        if (this.email.hasError('required')) {
          return 'PAGE.CONFIG.CLIENT.PERSONAL-INFO.EMAIL.VALIDATION.REQUIRED';
        }
        if (this.email.hasError('email')) {
          return 'PAGE.CONFIG.CLIENT.PERSONAL-INFO.EMAIL.VALIDATION.FORMAT_STANDARD';
        }
        return '';
      default:
        return '';
    }
  }
}
