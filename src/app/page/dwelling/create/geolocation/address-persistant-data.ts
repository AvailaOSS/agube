import { DwellingCreate, ReservoirCreate } from '@availa/agube-rest-api';

export interface EntityPersistantData {
  entity: DwellingCreate | ReservoirCreate;
}
