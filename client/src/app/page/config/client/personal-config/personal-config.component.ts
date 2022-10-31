import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '@availaoss/agube-rest-api';
import { PersonConfig } from '@availaoss/agube-rest-api';
import { TranslateService } from '@ngx-translate/core';
import { ThemeMode } from 'src/app/page/home/theme-mode';
import { Language } from 'src/app/utils/language';
import { ConfigureMode } from './personal-config';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { AccountService } from 'src/app/page/auth/login/service/account.service';

@Component({
    selector: 'app-personal-config',
    styleUrls: ['../client-page.component.scss'],
    templateUrl: './personal-config.component.html',
})
export class PersonalConfigComponent implements OnInit {
    public loadSave: boolean = false;
    public releaseDate: Date | undefined = undefined;
    public toggleControl = new FormControl(false);
    public selectedLanguage: Language | undefined;
    public languages: Language[] = [
        {
            code: 'ga',
            description: 'LENGUAGE.GALICIAN',
            flagLink: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Galicia.svg',
        },
        {
            code: 'es',
            description: 'LENGUAGE.SPANISH',
            flagLink: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Bandera_de_Espa%C3%B1a.svg',
        },
        {
            code: 'en',
            description: 'LENGUAGE.ENGLISH',
            flagLink: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg',
        },
    ];

    private lightClassName: ThemeMode = ThemeMode.light;
    private darkClassName: ThemeMode = ThemeMode.dark;
    private userId: number | undefined;

    constructor(
        private svcAccount: AccountService,
        private svcUser: UserService,
        protected overlayContainer: OverlayContainer,
        private translate: TranslateService,
        private googleAnalyticsService: GoogleAnalyticsService,
        private svcTranslate: TranslateService,
        private svcNotification: NotificationService
    ) {
        this.selectedLanguage = this.languages.filter((lang) => lang.code === this.translate.currentLang)[0];
    }

    ngOnInit(): void {
        this.svcAccount.getUser().subscribe((userResponse) => {
            if (!userResponse) {
                return;
            }
            this.userId = userResponse.user_id;

            this.svcUser.getConfig(this.userId!).subscribe((response) => {
                this.setControlToggle(response);
                this.selectedLanguage = this.languages.filter((lang) => lang.code === response.lang)[0];
                this.translate!.setDefaultLang(response.lang);
            });
        });
    }

    public selectLenguaje(language: Language) {
        this.selectedLanguage = language;
        this.googleAnalyticsService.gtag('event', 'language', {
            lang: language.code,
        });
    }

    public updateConfig() {
        this.loadSave = true;
        let selected: string = this.lightClassName;

        if (this.toggleControl.value) {
            selected = this.darkClassName;
        }

        let configureMode: ConfigureMode = {
            mode: selected,
            language: this.selectedLanguage!.code,
        };

        this.svcUser
            .updateConfig(this.userId!, {
                mode: configureMode.mode,
                lang: configureMode.language,
            })
            .subscribe({
                next: (response) => {
                    this.setControlToggle(response);
                    this.googleAnalyticsService.gtag('event', 'theme_type', {
                        lang: response.lang,
                        mode: response.mode,
                    });
                    window.location.reload();
                },
                error: (error) => {
                    let message = JSON.stringify(error.error);

                    if (error.status === 404) {
                        this.svcTranslate
                            .get('PAGE.CONFIG.CLIENT.CONFIGURE-MODE.LANGUAGE.ERROR')
                            .subscribe((response) => (message = response));
                    }
                    this.svcNotification.warning({ message: message });
                },
            });
    }

    private setControlToggle(response: PersonConfig) {
        if (response.mode === this.lightClassName) {
            this.toggleControl.setValue(false);
        } else {
            this.toggleControl.setValue(true);
        }
    }
}
