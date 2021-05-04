import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarUserComponent } from './toolbar-user/toolbar-user.component';
import { ToolbarBaseComponent } from './toolbar-base/toolbar-base.component';
import { ComponentsModule } from '../components/components.module';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [ToolbarComponent, ToolbarUserComponent, ToolbarBaseComponent],
  imports: [CommonModule, ComponentsModule, AuthModule],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
