import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeReservoirComponent } from './change-reservoir.component';
import { ToolbarComponent } from '../../../toolbar/toolbar.component';
import { ReservoirUtilsModule } from '../reservoir-utils/reservoir-utils/reservoir-utils.module';

@NgModule({
  imports: [CommonModule, ReservoirUtilsModule],
  declarations: [ChangeReservoirComponent],
})
export class ChangeReservoirModule {}
