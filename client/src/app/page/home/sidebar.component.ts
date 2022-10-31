import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonConfig, UserDetail, UserService } from '@availaoss/agube-rest-api';
import { CleanerCacheService } from 'src/app/utils/cache/cleaner-cache.service';
import { AccountService } from '../auth/login/service/account.service';
import { PersonalInfoPersistantService } from '../config/client/personal-info/personal-info-persistant.service';
import { SidebarConfig } from './sidebar-config';
import { ThemeMode } from './theme-mode';

@Component({
    selector: 'app-sidebar',
    styleUrls: ['./sidebar.component.scss'],
    template: `<ng-template></ng-template>`,
})
export class SidebarComponent {
    public pages: SidebarConfig[] = [];
    public home: string = '';
    public profile: string = '';
    public user: UserDetail | undefined;

    public toggleControl = new FormControl(false);

    public profilePhoto: any;
    private lightClassName: ThemeMode = ThemeMode.light;
    private darkClassName: ThemeMode = ThemeMode.dark;

    private userId: number | undefined;

    @HostBinding('class') className = this.lightClassName;

    constructor(
        protected router: Router,
        protected readonly accountService: AccountService,
        protected overlayContainer: OverlayContainer,
        private svcUser: UserService,
        private svcPersistantPersonal: PersonalInfoPersistantService,
        protected svcCleanerCache: CleanerCacheService
    ) {
        //FIXME: add pipe with first name and last name
        this.accountService.getUser().subscribe((userResponse) => {
            if (!userResponse || !userResponse.user_id) {
                return;
            }

            this.userId = userResponse.user_id;

            this.svcPersistantPersonal.get().subscribe((response) => {
                setTimeout(() => {
                    this.svcUser.getUserDetail(userResponse.user_id).subscribe((response) => (this.user = response));
                    this.svcUser.getUserPhoto(this.userId!).subscribe({
                        next: (response) => {
                            if (!response) {
                                return;
                            }
                            const reader = new FileReader();
                            reader.addEventListener('load', () => (this.profilePhoto = reader.result), false);
                            reader.readAsDataURL(response);
                        },
                    });
                }, 1200);
            });

            this.toggleControl.valueChanges.subscribe((isDarkMode) => {
                if (isDarkMode) {
                    this.overlayDialog(this.darkClassName, this.lightClassName);
                } else {
                    this.overlayDialog(this.lightClassName, this.darkClassName);
                }
            });

            this.svcUser.getUserDetail(userResponse.user_id).subscribe((response) => (this.user = response));
        });
        this.svcUser.getConfig(this.userId!).subscribe((response) => {
            if (!response) {
                return;
            }
            this.setControlToggle(response);
        });
    }

    public selectPage(select: SidebarConfig) {
        this.router.navigate([select.navigationRoute]);
    }

    public closeSession() {
        this.svcCleanerCache.clean();
        this.accountService.logout();
    }

    private overlayDialog(themeMode: ThemeMode, oldThemeMode: ThemeMode) {
        this.className = themeMode;
        this.overlayContainer.getContainerElement().classList.remove(oldThemeMode);
        this.overlayContainer.getContainerElement().classList.add(themeMode);
    }

    private setControlToggle(response: PersonConfig) {
        if (response.mode === this.lightClassName) {
            this.toggleControl.setValue(false);
            this.className = this.lightClassName;
        } else {
            this.toggleControl.setValue(true);
            this.className = this.darkClassName;
        }
    }
}
