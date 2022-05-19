import { AccountService } from '@availa/auth-fe';
import { UserService, Phone } from '@availa/agube-rest-api';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@availa/notification';
import { PersonalInfo } from './personal-info';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/components/upload-images/service/file-upload.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-personal-info',
    templateUrl: './personal-info.component.html',
    styleUrls: ['./personal-info.component.scss', '../client-page.component.scss'],
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
    public selectedFiles?: FileList;
    public previews: string[] = [];
    public imageInfos?: Observable<any>;
    private originalEmail: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private svcNotification: NotificationService,
        private svcAccount: AccountService,
        private svcUser: UserService,
        private uploadService: FileUploadService
    ) {
        this.personalForm = this.formBuilder.group({
            email: this.email,
            first_name: this.first_name,
            last_name: this.last_name,
        });
    }

    receiveFile(event: any) {
        console.log(event);
        this.selectedFiles = event;
    }

    upload(file: File): void {
        if (file) {
            this.uploadService.upload(file).subscribe({
                next: (event: any) => {
                    if (event instanceof HttpResponse) {
                        this.imageInfos = this.uploadService.getFiles();
                    }
                },
                error: (error) =>
                    this.svcNotification.warning({
                        message: 'Could not upload the file: ' + file.name,
                    }),
            });
        }
    }

    ngOnInit(): void {
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

    public emailHasChanged(): boolean {
        return this.email.value !== this.originalEmail;
    }

    public updateUser() {
        if (this.selectedFiles) {
            this.upload(this.selectedFiles![0]);
        }
        this.loadSave = true;
        let personalInfo: PersonalInfo = {
            email: this.email.value,
            first_name: this.first_name.value,
            last_name: this.last_name.value,
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
                },
                error: (error) => {
                    this.loadSave = false;
                    this.svcNotification.warning({
                        message: error + personalInfo,
                    });
                },
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
}
