import { Address } from '@availa/agube-rest-api';
import { ConfigureMap } from 'src/app/components/map/map/configure-map';

export interface DialogParameters {
  dialogTitle: string;
  address: Address | boolean;
  configureMap: ConfigureMap;
  userId: number;
}
