import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntityPersistantData } from './address-persistant-data';

@Injectable({
  providedIn: 'root',
})
export class AddressPersistantService {
  private entity: BehaviorSubject<EntityPersistantData | undefined> =
    new BehaviorSubject<EntityPersistantData | undefined>(undefined);

  constructor() {}

  public get() {
    return this.entity;
  }

  public persist(entity: EntityPersistantData) {
    this.entity.next(entity);
  }
}
