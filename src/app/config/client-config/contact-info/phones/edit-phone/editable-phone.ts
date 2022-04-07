import { UserPhone } from '@availa/agube-rest-api';

export interface EditablePhone {
  phone: UserPhone;
  isEditable: boolean;
}
