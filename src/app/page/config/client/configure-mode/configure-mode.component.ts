import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '@availa/agube-rest-api';
import { UserDetailConfigure } from '@availa/agube-rest-api/lib/model/userDetailConfigure';
import { AccountService } from '@availa/auth-fe';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ThemeMode } from 'src/app/page/home/theme-mode';
import { Language } from 'src/app/utils/language';
import { ConfigureMode } from './configure-mode';

@Component({
  selector: 'app-configure-mode',
  templateUrl: './configure-mode.component.html',
  styleUrls: ['../client-page.component.scss'],
})
export class ConfigureModeComponent implements OnInit {
  public loadSave: boolean = false;
  public releaseDate: Date | undefined = undefined;
  public toggleControl = new FormControl(false);
  public selectedLanguage: Language | undefined;
  public languages: Language[] = [
    {
      code: 'ga',
      description: 'LENGUAGE.GALICIAN',
      flagLink:
        'https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Galicia.svg',
    },
    {
      code: 'es',
      description: 'LENGUAGE.SPANISH',
      flagLink:
        'https://upload.wikimedia.org/wikipedia/commons/8/89/Bandera_de_Espa%C3%B1a.svg',
    },
    {
      code: 'en',
      description: 'LENGUAGE.ENGLISH',
      flagLink:
        'https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg',
    },
  ];

  private logOut: Subscription | undefined;
  private darkClassName: ThemeMode = ThemeMode.dark;
  private lightClassName: ThemeMode = ThemeMode.light;
  private userId: number | undefined;

  constructor(
    private svcAccount: AccountService,
    private svcUser: UserService,
    protected overlayContainer: OverlayContainer,
    private translate: TranslateService
  ) {
    this.selectedLanguage = this.languages[0];
  }

  public selectLenguaje(language: Language) {
    this.selectedLanguage = language;
    this.translate.use(language.code);
  }

  ngOnInit(): void {
    this.logOut = this.svcAccount.getUser().subscribe((userResponse) => {
      if (!userResponse) {
        return;
      }
      this.userId = userResponse.user_id;

      this.svcUser
        .getUserDetailConfig(String(this.userId!))
        .subscribe((response) => {
          this.setControlToggle(response);
          this.selectedLanguage = this.languages.filter(
            (lang) => lang.code === response.lang
          )[0];
          this.translate!.setDefaultLang(response.lang);
        });
    });
  }

  saveForm() {
    this.loadSave = true;
    let selected: string = this.darkClassName;
    if (this.toggleControl.value) {
      selected = this.lightClassName;
    }
    let configureMode: ConfigureMode = {
      mode: selected,
      language: this.selectedLanguage!.code,
    };

    this.svcUser
      .updateConfigureTheme(String(this.userId!), {
        mode: configureMode.mode,
        lang: configureMode.language,
      })
      .subscribe((response: any) => {
        this.setControlToggle(response);
      });

    this.loadSave = false;
  }

  private setControlToggle(response: UserDetailConfigure) {
    if (response.mode === this.lightClassName) {
      this.toggleControl.setValue(true);
    } else {
      this.toggleControl.setValue(false);
    }
  }
}
