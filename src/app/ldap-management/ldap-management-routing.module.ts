import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LdapListComponent } from './ldap-list/ldap-list.component';
import { LdapAddComponent } from './ldap-add/ldap-add.component';
import { LdapEditComponent } from './ldap-edit/ldap-edit.component';

const routes: Routes = [
  { path: 'users/list', component: LdapListComponent },
  { path: 'users/add', component: LdapAddComponent },
  { path: 'users/:id', component: LdapEditComponent },
  { path: '', redirectTo: 'users/list', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LdapManagementRoutingModule {}
