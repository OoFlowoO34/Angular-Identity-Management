import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {
  ConfirmValidParentMatcher,
  passwordMatchingValidator,
} from './passwords-validator.directive';
import { UserLdap } from 'src/app/models/user-ldap';

export abstract class LdapDetailsComponent {
  user: UserLdap | undefined;
  processLoadRunning: boolean = false;
  processValidateRunning: boolean = false;
  passwordPlaceHolder: string;
  errorMessage = '';

  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  userForm = this.fb.group({
    login: [''], // Valeur de départ vide
    nom: [''],
    prenom: [''],
    // Groupe de données imbriqué
    passwordGroup: this.fb.group(
      {
        password: [''],
        confirmPassword: [''],
      },
      { validators: passwordMatchingValidator }
    ),
    mail: { value: '', disabled: true },
  });

  get passwordForm() {
    return this.userForm.get('passwordGroup');
  }

  protected constructor(
    public addForm: boolean,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.passwordPlaceHolder =
      'Mot de passe' + (this.addForm ? '' : '(vide si inchangé)');
    if (this.addForm) {
      this.passwordForm?.get('password')?.addValidators(Validators.required);
      this.passwordForm
        ?.get('confirmPassword')
        ?.addValidators(Validators.required);
    }
  }

  goToLdap(): void {
    this.router.navigate(['/users/list']).then((e) => {
      if (!e) {
        console.error('Navigation has failed');
      }
    });
  }

  onSubmitForm(): void {
    this.validateForm();
    // A faire plus tard
  }
  isFormValid(): boolean {
    return (
      this.userForm.valid &&
      (!this.addForm || this.formGetValue('passwordGroup.password') !== '')
    );
  }

  abstract validateForm(): void;

  private formGetValue(name: string): string {
    const control = this.userForm.get(name);
    if (control === null) {
      console.error("L'objet " + name + " du formlaire n'existe pas");
      return '';
    }
    return control.value;
  }

  private formSetValue(name: string, value: string | number): void {
    const control = this.userForm.get(name);
    if (control === null) {
      console.error("L'objet" + name + " du formlaire n'existe pas");
      return;
    }
    control.setValue(value);
  }

  protected copyUserToFormControl(): void {
    if (this.user === undefined) {
      return;
    }
    this.formSetValue('login', this.user.login);
    this.formSetValue('nom', this.user.nom);
    this.formSetValue('prenom', this.user.prenom);
    this.formSetValue('mail', this.user.mail);
    // Ajouter les champs supplémentaires dans de ts et le html
  }

  protected getUserFromFormControl(): UserLdap {
    return {
      login: this.formGetValue('login'),
      nom: this.formGetValue('nom'),
      prenom: this.formGetValue('prenom'),
      nomComplet: this.formGetValue('nom') + ' ' + this.formGetValue('prenom'),
      mail: this.formGetValue('mail'),

      // Les valeurs suivantes devraient être reprise du formulaire
      employeNumero: 1, // this.formGetValue('employeNumero'),
      employeNiveau: 1, // this.formGetValue('employeNiveau'),
      dateEmbauche: '2020-04-24', // this.formGetValue('date Embauche'),
      publisherId: 1, // this.formGetValue('publisherId'),
      active: true,
      motDePasse: '',
      role: 'ROLE_USER',
    };
  }

  getErrorMessage(): string {
    if (this.passwordForm?.errors) {
      return 'Les mots de passes ne correspondent pas';
    }
    return 'Entrez un mot de passe';
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
}
