import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeOwnerComponent } from './change-owner.component';
import { ToolbarModule } from '../../../../menu/toolbar.module';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  declarations: [ChangeOwnerComponent],
  imports: [CommonModule, ToolbarModule, UtilsModule],
})
export class ChangeOwnerModule {}
