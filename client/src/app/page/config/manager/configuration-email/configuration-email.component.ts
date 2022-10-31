import { ManagerMessage } from '@availaoss/agube-rest-api';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ManagerService } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-configuration-email',
    styleUrls: ['./configuration-email.component.scss', '../manager-page.component.scss'],
    templateUrl: './configuration-email.component.html',
})
export class ConfigurationEmailComponent implements OnInit {
    public loadSave: boolean = false;
    public message = new FormControl('', [Validators.required]);
    public checked: boolean = false;

    constructor(
        private svcManager: ManagerService,
        private svcNotification: NotificationService,
        private svcTranslate: TranslateService
    ) {}

    public errorValidator(entity: string) {
        switch (entity) {
            case 'message':
                if (this.message.hasError('required')) {
                    return 'PAGE.CONFIG.MANAGER.NOTIFICATION.MESSAGE_REQUIRED';
                }
                return '';
            default:
                return '';
        }
    }
    public ngOnInit(): void {
        this.svcManager.getManagerMessage().subscribe((res) => {
            this.message.setValue(res.message);
            this.checked = res.is_active;
        });
    }

    public saveNotification() {
        this.loadSave = true;
        let data: ManagerMessage = {
            is_active: this.checked,
            message: this.message.value,
        };
        this.svcManager.updateManagerMessage(data).subscribe({
            next: () => {
                this.loadSave = false;
                this.ngOnInit();
            },
            error: (error) => {
                this.loadSave = false;
                let message = JSON.stringify(error.error);

                if (error.status === 404) {
                    this.svcTranslate
                        .get('PAGE.CONFIG.MANAGER.NOTIFICATION.MESSAGE_ERROR')
                        .subscribe((response) => (message = response));
                }
                this.svcNotification.warning({ message: message });
            },
        });
    }
}
