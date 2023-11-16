import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LdapDetailsComponent } from '../ldap-details/ldap-details.component';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-ldap-edit',
  templateUrl: '../ldap-details/ldap-details.component.html',
  styleUrls: ['../ldap-details/ldap-details.component.css'],
})
export class LdapAddComponent extends LdapDetailsComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    fb: FormBuilder,
    router: Router,
    private snackBar: MatSnackBar
  ) {
    super(false, fb, router);
  }
  ngOnInit(): void {
    super.onInit();
  }

  validateForm(): void {
    console.log('LdapAddComponent - validateForm');
    this.processValidateRunning = true;
    this.usersService.updateUser(this.getUserFormControl()).subscribe({
      next: (value): void => {
        this.processValidateRunning = false;
        this.errorMessage = '';
        this.snackBar.open('Utilisateur ajouté !', 'X');
      },

      error: (err): void => {
        this.processValidateRunning = false;
        this.errorMessage = 'Une erreur est survenue dans l ajout !';
        console.error('Ajout utilisateur', err);
        this.snackBar.open('Utilisateur non ajouté !', 'X');
      },
    });
  }

  isFormValid(): boolean {
    return (
      this.userForm.valid &&
      (!this.addForm || this.formGetValue('passwordGroup.password') !== '')
    );
  }
}
