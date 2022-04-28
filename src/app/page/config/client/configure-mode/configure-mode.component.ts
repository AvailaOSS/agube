import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '@availa/agube-rest-api';
import { AccountService } from '@availa/auth-fe';
import { NotificationService } from '@availa/notification';
import { Subscription } from 'rxjs';
import { ConfigureMode } from './configure-mode';

@Component({
  selector: 'app-configure-mode',
  templateUrl: './configure-mode.component.html',
  styleUrls: ['../client-page.component.scss'],
})
export class ConfigureModeComponent implements OnInit {
  public loadSave: boolean = false;
  public configureForm: FormGroup;
  public mode = new FormControl('', [Validators.required]);
  public language = new FormControl('', [Validators.required]);

  public releaseDate: Date | undefined = undefined;

  private logOut: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private svcNotification: NotificationService,
    private svcAccount: AccountService,
    private svcUser: UserService
  ) {
    this.configureForm = this.formBuilder.group({
      username: this.mode,
      email: this.language,
    });
  }

  ngOnInit(): void {
    this.logOut = this.svcAccount.getUser().subscribe((userResponse) => {
      if (!userResponse) {
        return;
      }

      // this.svcUser
      //   .getUserDetailConfig(userResponse!.user_id)
      //   .subscribe((response) => {
      //     this.mode.setValue(userResponse?.mode);
      //     this.language.setValue(response.lang);
      //   });
    });
  }

  saveForm() {
    this.loadSave = true;
    let configureMode: ConfigureMode = {
      mode: this.mode.value,
      language: this.language.value,
    };

    //FIXME: save data with service and progress bar
    this.svcNotification.info({
      message: 'Funcionalidad todavía no implementada ' + configureMode,
    });
    this.loadSave = false;
  }

  public errorValidator(entity: string) {
    switch (entity) {
      case 'mode':
        if (this.mode.hasError('required')) {
          return 'PAGE.CONFIG.CLIENT.CONFIGURE-MODE.MODE.VALIDATION.REQUIRED';
        }
        return '';
      case 'language':
        if (this.language.hasError('required')) {
          return 'PAGE.CONFIG.CLIENT.CONFIGURE-MODE.LANGUAGE.VALIDATION.REQUIRED';
        }
        return '';
      default:
        return '';
    }
  }
}
