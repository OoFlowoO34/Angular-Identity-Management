import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LdapDetailsComponent } from '../ldap-details/ldap-details.component';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-ldap-add',
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
  }

  validateForm(): void {
    console.log('LdapAddComponent - validateForm');
    this.processValidateRunning = true;
    this.usersService.updateUser(this.getUserFromFormControl()).subscribe({
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

  // // (override is not needed)
  // override getUserFormControl(): import('../models/user-ldap').UserLdap {
  //   // Implement logic to retrieve user form control values
  //   return {
  //     login: this.formGetValue('login'),
  //     nom: this.formGetValue('nom'),
  //     prenom: this.formGetValue('prenom'),
  //     nomComplet: this.formGetValue('nom') + ' ' + this.formGetValue('prenom'),
  //     mail: this.formGetValue('mail'),
  //     employeNumero: 1,
  //     employeNiveau: 1,
  //     dateEmbauche: '2020-04-24',
  //     publisherId: 1,
  //     active: true,
  //     motDePasse: '',
  //     role: 'ROLE_USER',
  //   };
  // }

  // isFormValid(): boolean {
  //   return (
  //     this.userForm.valid &&
  //     (!this.addForm || this.formGetValue('passwordGroup.password') !== '')
  //   );
  // }
}
