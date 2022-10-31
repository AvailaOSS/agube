import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DwellingService, DwellingCreate, UserCreate } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { map, Observable, startWith } from 'rxjs';

@Component({
    selector: 'app-change',
    styleUrls: ['./change.component.scss'],
    templateUrl: './change.component.html',
})
export class ChangeComponent implements OnInit {
    public title: string = '';
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

    public dwelling: DwellingCreate | undefined;
    public currentPerson: UserCreate | undefined;

    public dwellingId: number = -1;

    public loadingPost = false;

    constructor(
        private location: Location,
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
        });
    }

    public ngOnInit(): void {
        this.svcDwelling.getDwelling(this.dwellingId).subscribe((response) => (this.dwelling = response));
    }

    public save() {
        if (this.personForm.invalid) {
            return;
        }
    }

    public exit() {
        this.location.back();
    }

    public saveAndExit() {
        this.save();

        this.exit();
    }

    public errorValidator(entity: string) {
        switch (entity) {
            case 'first_name':
                if (this.first_name.hasError('required')) {
                    return 'PAGE.DWELLING.MANAGER.PERSON.CHANGE.FIRST_NAME.VALIDATION.' + this.title;
                }
                return '';
            case 'last_name':
                if (this.last_name.hasError('required')) {
                    return 'PAGE.DWELLING.MANAGER.PERSON.CHANGE.FIRST_NAME.VALIDATION.' + this.title;
                }
                return '';

            case 'email':
                if (this.email.hasError('required')) {
                    return 'PAGE.DWELLING.MANAGER.CHANGE.EMAIL.VALIDATION.' + this.title;
                }
                if (this.email.hasError('email')) {
                    return 'PAGE.DWELLING.MANAGER.PERSON.CHANGE.EMAIL.VALIDATION.EMAIL_FORMAT';
                }
                return '';
            case 'phone_number':
                let invalidPattern = 'PAGE.CONFIG.CLIENT.CONTACT-INFO.PHONE.FORM.VALIDATION.PATTERN';
                if (this.phone_number.hasError('required')) {
                    return 'PAGE.DWELLING.MANAGER.PERSON.CHANGE.EMAIL.VALIDATION.REQUIRED';
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
