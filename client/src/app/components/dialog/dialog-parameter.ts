import { Geolocation } from '@availa/agube-rest-api';
import { ConfigureMap } from 'src/app/components/map/map/configure-map';

export interface DialogParameters {
    dialogTitle: string;
    geolocation?: Geolocation;
    configureMap: ConfigureMap;
    // possibility load Create Form or Edit Form  to dialog
    create: boolean;
    edit: boolean;
}
