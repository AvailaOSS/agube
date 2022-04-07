import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

export interface Lenguajes {
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

  public lenguajes: Lenguajes[] = [
    {
      code: 'es',
      description: 'Español',
      flagLink: 'http://country.io/static/flags/48/es.png',
    },
    {
      code: 'en',
      description: 'English',
      flagLink: 'http://country.io/static/flags/48/gb.png',
    },
  ];

  public selectedLenguaje = new FormControl('');

  constructor(private translate: TranslateService) {}
}
