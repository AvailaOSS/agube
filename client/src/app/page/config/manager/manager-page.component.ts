import { JoyRideFunction } from 'src/app/utils/joyride/joyride';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { JoyrideService } from 'ngx-joyride';

@Component({
    selector: 'app-page-config-manager',
    styleUrls: ['./manager-page.component.scss'],
    templateUrl: './manager-page.component.html',
})
export class ManagerPageComponent implements OnInit {
    constructor(private svcTranslate: TranslateService, private readonly joyrideService: JoyrideService) {}

    public ngOnInit(): void {}

    // call function to joyride
    public tour() {
        let steps: string[] = ['ParamsConfigStep', 'EmailConfigStep', 'ContactConfigStep'];
        JoyRideFunction(this.joyrideService, this.svcTranslate, steps);
    }
}
