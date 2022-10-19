import { UserGeolocation } from '@availaoss/agube-rest-api';

export interface EditableGeolocation {
    geolocation: UserGeolocation;
    isEditable: boolean;
}
