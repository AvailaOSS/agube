import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthApiModule } from 'apiaux/auth-rest-api-lib/src/public-api';
import { EnableAccountModule } from './enable-account/enable-account.module';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthApiModule, LoginModule, EnableAccountModule],
})
export class AuthModule {}
