import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotificationService } from '@availa/notification';
import { passwordMatches } from './password-validator';
import { UserService, ChangePassword } from '@availa/auth-rest-api';
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['../client-config.component.scss', './password.component.scss'],
})
export class PasswordComponent {
  public loadSave: boolean = false;
  public passwordForm: FormGroup;
  public username = new FormControl('', [Validators.required]);
  public password = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(16),
  ]);
  public confirmPassword = new FormControl({ value: '', disabled: true }, [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(16),
    passwordMatches(this.password),
  ]);

  public releaseDate: Date | undefined = undefined;
  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private svcNotification: NotificationService,
    private svcUser: UserService
  ) {
    this.passwordForm = this.formBuilder.group({
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
    this.confirmPassword.disable();
  }

  public enableConfirmPassword(event: KeyboardEvent) {
    this.password.valueChanges.subscribe((c) => {
      if (this.password.errors) {
        this.confirmPassword.disable();
      } else {
        this.confirmPassword.enable();
      }
    });
  }

  savePassword() {
    if (this.passwordForm.invalid) {
      return;
    }
    this.loadSave = true;
    let pass: ChangePassword = {
      password: this.password.value,
      confirm_password: this.confirmPassword.value,
      username: this.username.value,
    };
    this.svcUser.changePassword(pass).subscribe({
      next: () => {
        this.username.setValue('');
        this.password.setValue('');
        this.confirmPassword.setValue('');
        this.loadSave = false;
      },
      error: (error) => {
        this.svcNotification.warning({ message: error }, 8);
        this.loadSave = false;
      },
    });
  }

  public errorValidator(entity: string) {
    switch (entity) {
      case 'username':
        if (this.username.hasError('required')) {
          return 'Inserta tu nombre de usuario para confirmar tu identidad';
        }
        return '';
      case 'password':
        if (this.password.hasError('required')) {
          return 'Inserta una contraseña';
        }
        if (this.password.hasError('minlength')) {
          return 'La contraseña debe tener al menos 5 caracteres.';
        }
        if (this.password.hasError('maxlength')) {
          return 'La contraseña debe tener hasta 16 caracteres.';
        }
        return '';
      case 'confirmPassword':
        if (this.confirmPassword.hasError('required')) {
          return 'Inserta una contraseña de confirmación';
        }
        if (this.confirmPassword.hasError('minlength')) {
          return 'La contraseña de confirmación debe tener al menos 5 caracteres.';
        }
        if (this.confirmPassword.hasError('maxlength')) {
          return 'La contraseña  de confirmación debe tener hasta 16 caracteres.';
        }
        if (this.confirmPassword.hasError('noMatched')) {
          return 'La contraseñas no son iguales.';
        }
        return '';
      default:
        return '';
    }
  }
}
