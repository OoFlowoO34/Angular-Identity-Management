import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LdapAddComponent } from './ldap-add/ldap-add.component';
import { LdapDetailsComponent } from './ldap-details/ldap-details.component';
import { LdapEditComponent } from './ldap-edit/ldap-edit.component';
import { LdapListComponent } from './ldap-list/ldap-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'users/list', component: LdapListComponent },
  { path: 'users/add', component: LdapAddComponent },
  { path: 'users/:id', component: LdapEditComponent },
  { path: '**', component: PageNotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
