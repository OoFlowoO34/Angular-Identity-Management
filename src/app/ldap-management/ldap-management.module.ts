import { LdapManagementRoutingModule } from './ldap-management-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LdapListComponent } from './ldap-list/ldap-list.component';
import { LdapAddComponent } from './ldap-add/ldap-add.component';
import { LdapEditComponent } from './ldap-edit/ldap-edit.component';
import { AlertComponent } from '../share/alert/alert.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material.module';

@NgModule({
  declarations: [
    LdapListComponent,
    LdapAddComponent,
    LdapEditComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LdapManagementRoutingModule,
    AppMaterialModule,
  ],
})
export class LdapManagementModule {}
