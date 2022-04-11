import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Language {
  code: string;
  description: string;
  flagLink: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'agube-fe';

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
      flagLink: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Bandera_de_Espa%C3%B1a.svg',
    },
    {
      code: 'en',
      description: 'LENGUAGE.ENGLISH',
      flagLink: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg',
    },
  ];

  public selectedLanguage: Language = this.languages[1];

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.selectedLanguage.code);
  }

  public selectLenguaje(language: Language) {
    this.selectedLanguage = language;
    this.translate.use(language.code);
  }
}
