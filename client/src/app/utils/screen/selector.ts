import { ViewType } from './type';
import { Type } from '@angular/core';
import { ConfigurationComponentSelector } from './configuration';

export function selector(configuration: ConfigurationComponentSelector): Type<any> {
    let component: Type<any>;

    switch (true) {
        case window.innerWidth <= ViewType.Mobile:
            component = configuration.mobile;
            break;
        case window.innerWidth > ViewType.Mobile && window.innerWidth <= ViewType.Tablet:
            component = configuration.tablet;
            break;
        case window.innerWidth > ViewType.Tablet && window.innerWidth <= ViewType.Desktop:
            component = configuration.desktop;
            break;
        case window.innerWidth > ViewType.Desktop:
            component = configuration.tv;
            break;
        default:
            component = configuration.defaultComponent;
            break;
    }

    return component;
}
