import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToolbarBaseComponent } from './toolbar-base/toolbar-base.component';
import { ToolbarUserComponent } from './toolbar-user/toolbar-user.component';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [ToolbarComponent, ToolbarUserComponent, ToolbarBaseComponent],
  imports: [CommonModule],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
