import { UserAddress } from '@availa/agube-rest-api';

export interface EditableAddress {
  address: UserAddress;
  isEditable: boolean;
}
