import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '@availaoss/agube-rest-api';
import { TranslateService } from '@ngx-translate/core';
import { AccountService as AuthAccountService } from 'src/app/page/auth/login/service/account.service';
import { Icon } from './utils/icons';
import { Language } from './utils/language';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html',
})
export class AppComponent {
    public icons: Icon[] = [
        {
            name: 'person',
            path: '/assets/icons/person.svg',
        },
        {
            name: 'house',
            path: '/assets/icons/house.svg',
        },
        {
            name: 'reservoir',
            path: '/assets/icons/reservoir.svg',
        },
        {
            name: 'spring_source',
            path: '/assets/icons/springsource.svg',
        },
        {
            name: 'resident',
            path: '/assets/icons/resident.svg',
        },
        {
            name: 'settings',
            path: '/assets/icons/settings.svg',
        },
        {
            name: 'save',
            path: '/assets/icons/save.svg',
        },
        {
            name: 'add',
            path: '/assets/icons/add.svg',
        },
        {
            name: 'close',
            path: '/assets/icons/close.svg',
        },
        {
            name: 'edit',
            path: '/assets/icons/edit.svg',
        },
        {
            name: 'trash',
            path: '/assets/icons/trash.svg',
        },
        {
            name: 'star',
            path: '/assets/icons/star.svg',
        },
        {
            name: 'star_border',
            path: '/assets/icons/star-border.svg',
        },
        {
            name: 'map',
            path: '/assets/icons/map.svg',
        },
        {
            name: 'visibility',
            path: '/assets/icons/visibility.svg',
        },
        {
            name: 'alarm_add',
            path: '/assets/icons/alarm_add.svg',
        },
        {
            name: 'alarm_update',
            path: '/assets/icons/alarm_update.svg',
        },
        {
            name: 'phone',
            path: '/assets/icons/phone.svg',
        },
        {
            name: 'capacity_reservoir',
            path: '/assets/icons/capacity_reservoir.svg',
        },
        {
            name: 'prev',
            path: '/assets/icons/prev.svg',
        },
        {
            name: 'next',
            path: '/assets/icons/next.svg',
        },
        {
            name: 'tour',
            path: '/assets/icons/tour.svg',
        },
    ];

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

    public selectedLanguage: Language = this.languages[1];

    constructor(
        private translate: TranslateService,
        private svcAccount: AuthAccountService,
        private svcUser: UserService,
        protected matIconRegistry: MatIconRegistry,
        protected domSanitizer: DomSanitizer
    ) {
        this.loadIcons(this.icons);
        this.selectLanguage(this.selectedLanguage);
        this.svcAccount.getUser().subscribe((userResponse) => {
            if (!userResponse) {
                return;
            }

            this.svcUser.getConfig(userResponse.user_id!).subscribe((response) => {
                this.selectedLanguage = this.languages.filter((lang) => lang.code === response.lang)[0];
                this.selectLanguage(this.selectedLanguage);
            });
        });
    }

    private loadIcons(icons: Icon[]) {
        icons.forEach((icon) =>
            this.matIconRegistry.addSvgIcon(icon.name, this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path))
        );
    }

    public selectLanguage(language: Language) {
        this.selectedLanguage = language;
        this.translate.setDefaultLang(language.code);
        this.translate.use(language.code);
    }
}
