import { ManagerMessage } from '@availa/agube-rest-api/lib/model/managerMessage';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ManagerService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-configuration-email',
    templateUrl: './configuration-email.component.html',
    styleUrls: ['./configuration-email.component.scss', '../manager-page.component.scss'],
})
export class ConfigurationEmailComponent implements OnInit {
    public loadSave: boolean = false;
    public message = new FormControl('', [Validators.required]);

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
        });
    }

    public saveNotification() {
        this.loadSave = true;
        let data: ManagerMessage = {
            is_active: true,
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
