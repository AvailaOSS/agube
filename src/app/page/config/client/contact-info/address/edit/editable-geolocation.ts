import { UserGeolocation } from '@availa/agube-rest-api';

export interface EditableGeolocation {
    geolocation: UserGeolocation;
    isEditable: boolean;
}
