import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { GenericFormsComponent } from './subscription/generic-forms/generic-forms.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ContactBookComponent } from './contact-book/contact-book.component';
import { PrincipalComponent } from './principal/principal.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'contact-book', component: ContactBookComponent },
  { path: 'forms', component: GenericFormsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
