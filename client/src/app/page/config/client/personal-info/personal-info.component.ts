import { UserService, Phone } from '@availaoss/agube-rest-api';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { PersonalInfo } from './personal-info';
import { Observable } from 'rxjs';
import { PersonalInfoPersistantService } from './personal-info-persistant.service';
import { JoyRideFunction } from 'src/app/utils/joyride/joyride';
import { TranslateService } from '@ngx-translate/core';
import { JoyrideService } from 'ngx-joyride';
import { AccountService } from 'src/app/page/auth/login/service/account.service';

@Component({
    selector: 'app-personal-info',
    styleUrls: ['./personal-info.component.scss', '../client-page.component.scss'],
    templateUrl: './personal-info.component.html',
})
export class PersonalInfoComponent implements OnInit {
    public loadSave: boolean = false;
    public personalForm: FormGroup;
    public email = new FormControl('', [Validators.required, Validators.email]);
    public first_name = new FormControl('', [Validators.required]);
    public last_name = new FormControl('', [Validators.required]);
    public main_phone: Phone | undefined;
    public userId: number | undefined;
    public releaseDate: Date | undefined = undefined;
    public selectedFile: File | undefined;
    public previews: string[] = [];
    public imageInfos?: Observable<any>;
    public photo: any;
    private originalEmail: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private svcNotification: NotificationService,
        private svcAccount: AccountService,
        private svcUser: UserService,
        private svcPersistantPersonal: PersonalInfoPersistantService,
        private svcTranslate: TranslateService,
        private readonly joyrideService: JoyrideService
    ) {
        this.personalForm = this.formBuilder.group({
            email: this.email,
            first_name: this.first_name,
            last_name: this.last_name,
        });
    }

    public ngOnInit(): void {
        this.svcAccount.getUser().subscribe((userResponse) => {
            if (!userResponse) {
                return;
            }
            this.userId = userResponse!.user_id;
            this.svcUser.getUserDetail(userResponse!.user_id).subscribe((response) => {
                this.originalEmail = response.email!;
                this.email.setValue(response.email);
                this.first_name.setValue(response.first_name);
                this.last_name.setValue(response.last_name);
                this.main_phone = response.main_phone;
            });
        });
    }

    public receiveFile(event: any) {
        this.selectedFile = event;
    }

    public emailHasChanged(): boolean {
        return this.email.value !== this.originalEmail;
    }

    public updateUser() {
        this.loadSave = true;

        let personalInfo: PersonalInfo = {
            email: this.email.value,
            first_name: this.first_name.value.trim().toLowerCase(),
            last_name: this.last_name.value.trim().toLowerCase(),
        };

        this.loadSave = true;

        this.svcUser
            .updateUserDetail(this.userId!, {
                main_phone: this.main_phone!,
                email: personalInfo.email,
                first_name: personalInfo.first_name,
                last_name: personalInfo.last_name,
            })
            .subscribe({
                next: (response) => {
                    setTimeout(() => {
                        this.loadSave = false;
                        this.email.setValue(response.email);
                        this.first_name.setValue(response.first_name);
                        this.last_name.setValue(response.last_name);
                        this.main_phone = response.main_phone;
                    }, 1500);

                    this.svcPersistantPersonal.emit(true);
                },
                error: (error) => {
                    this.loadSave = false;
                    this.svcNotification.warning({
                        message: error + personalInfo,
                    });
                },
            });

        this.upload(this.selectedFile);
    }

    public upload(file: File | undefined): void {
        if (!file) {
            return;
        }
        this.svcUser.setUserPhoto(file).subscribe(() => {
            this.svcPersistantPersonal.emit(true);
        });
    }

    public errorValidator(entity: string) {
        switch (entity) {
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
    // call function to joyride
    public tour() {
        let steps: string[] = ['PersonalInfoStep', 'ContactInfoStep', 'PersonalConfigStep', 'PasswordConfigStep'];
        JoyRideFunction(this.joyrideService, this.svcTranslate, steps);
    }
}
