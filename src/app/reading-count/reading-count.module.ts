import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadingCountComponent } from './reading-count.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [ReadingCountComponent],
  imports: [CommonModule, ComponentsModule],
})
export class ReadingCountModule {}
