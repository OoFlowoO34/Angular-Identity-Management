import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LdapDetailsComponent } from './ldap-details/ldap-details.component';
import { LdapListComponent } from './ldap-list/ldap-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'users/list', component: LdapListComponent },
  { path: 'users/:id', component: LdapDetailsComponent },
  { path: '**', component: PageNotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
