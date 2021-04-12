import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  ɵConsole,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from 'apiaux/contact-book-rest-api-lib/src/public-api';
import { isNull, isUndefined } from 'lodash';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly svcContactService: ContactService
  ) {
    if (!isNull(this.data)) {
      this.form = this.formBuilder.group({
        id: [this.data.dataKey.id],
        username: [this.data.dataKey.user.username, Validators.required],
        first_name: [this.data.dataKey.user.first_name, Validators.required],
        last_name: [this.data.dataKey.user.last_name, Validators.required],
        email: [this.data.dataKey.user.email, Validators.required],
        phone_number: [this.data.dataKey.phone_number],
        business: [this.data.dataKey.business, Validators.required],
      });
    } else {
      this.form = this.formBuilder.group({
        username: ['', Validators.required],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', Validators.required],
        phone_number: [''],
        business: ['', Validators.required],
      });
    }
  }

  public ngOnInit(): void {}

  public submit(): void {
    // if (this.form.valid) {
    //   if (!isUndefined(this.form.value.id)) {
    //     this.svcContactService
    //       .contactCreate({
    //         id: this.form.value.id,
    //         phone_number: this.form.value.phone_number,
    //         user: {
    //           username: this.form.value.username,
    //           email: this.form.value.email,
    //           first_name: this.form.value.email,
    //           last_name: this.form.value.last_name,
    //         },
    //       })
    //       .subscribe((value) => {});
    //   } else {
    //     this.svcContactService
    //       .contactCreate({
    //         phone_number: this.form.value.phone_number,
    //         user: {
    //           username: this.form.value.username,
    //           email: this.form.value.email,
    //           first_name: this.form.value.email,
    //           last_name: this.form.value.last_name,
    //         },
    //       })
    //       .subscribe((value) => {});
    //   }
    // }
  }
}
