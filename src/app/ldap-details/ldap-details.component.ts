import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from '../service/users.service';
import { UserLdap } from '../models/user-ldap';
import { AbstractControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ldap-details',
  templateUrl: './ldap-details.component.html',
  styleUrls: ['./ldap-details.component.css'],
})
export class LdapDetailsComponent implements OnInit {
  user: UserLdap | undefined;
  processLoadRunning: boolean = false;
  processValidateRunning: boolean = false;

  userForm = this.fb.group({
    login: [''], // Valeur de départ vide
    nom: [''],
    prenom: [''],
    // Groupe de données imbriqué
    passwordGroup: this.fb.group({ password: [''] }),
    confirmPassword: [''],
    mail: { value: '', disabled: true },
  });

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const login = this.route.snapshot.params['id'];
    this.userService.getUser(login).subscribe((user) => {
      if (user) {
        this.user = user;
      } else {
        console.error("Can't find user id");
      }
    });
    console.log(login);
  }

  goToLdap(): void {
    this.router.navigate(['/users/list']).then((e) => {
      if (!e) {
        console.error('Navigation has failed');
      }
    });
  }

  onSubmitForm(): void {
    // A faire plus tard
  }

  updateLogin(): void {
    const control = this.userForm.get('login');
    if (control === null) {
      console.error("L'objet 'login' du formlaire n'existe pas");
      return;
    }

    control.setValue(
      (
        this.formGetValue('prenom') +
        '.' +
        this.formGetValue('nom')
      ).toLowerCase()
    );
    this.updateMail();
  }

  updateMail(): void {
    const control = this.userForm.get('mail');
    if (control === null) {
      console.error("L'objet 'mail' du formlaire n'existe pas");
      return;
    }
    control.setValue(this.formGetValue('login').toLowerCase() + '@epsi.lan');
  }

  isFormValid(): boolean {
    return false;
  }

  private formGetValue(name: string): string {
    const control = this.userForm.get(name);
    if (control === null) {
      console.error("L'objet " + name + " du formlaire n'existe pas");
      return '';
    }
    return control.value;
  }
}
