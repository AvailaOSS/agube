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
        steps,
        waitingTime: 250,
        themeColor: '#7fd3f7',
        showPrevButton: true,
        stepDefaultPosition: 'left',
        showCounter: true,
        customTexts: {
            prev,
            next,
            close,
            done,
        },
    });
}
