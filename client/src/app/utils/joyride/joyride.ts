import { TranslateService } from '@ngx-translate/core';
import { JoyrideService } from 'ngx-joyride';

// function to add joyride to component to call
export function JoyRideFunction(joyrideService: JoyrideService, svcTranslate: TranslateService, steps: string[]) {
    let done: string = '';
    let prev: string = '';
    let next: string = '';
    let close: string = '';
    // translate variables
    svcTranslate.get('PAGE.TOUR.BUTTONS-NEXT').subscribe((response) => (next = response));
    svcTranslate.get('PAGE.TOUR.BUTTONS-PREV').subscribe((response) => (prev = response));
    svcTranslate.get('PAGE.TOUR.BUTTONS-DONE').subscribe((response) => (done = response));
    svcTranslate.get('PAGE.TOUR.BUTTONS-CLOSE').subscribe((response) => (close = response));

    // Start tout
    joyrideService.startTour({
        customTexts: {
            close,
            done,
            next,
            prev,
        },
        showCounter: true,
        showPrevButton: true,
        stepDefaultPosition: 'left',
        steps,
        themeColor: '#7fd3f7',
        waitingTime: 250,
    });
}
