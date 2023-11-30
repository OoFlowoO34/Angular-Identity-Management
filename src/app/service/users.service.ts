import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LDAP_USERS } from '../models/ldap-mock-data';
import { UserLdap } from '../models/user-ldap';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  users: UserLdap[] = LDAP_USERS;

  getUsers(): Observable<UserLdap[]> {
    return of(this.users);
  }

  getUser(login: string): Observable<UserLdap | undefined> {
    console.log(this.users.find((user) => user.login === login));
    return of(this.users.find((user) => user.login === login));
  }

  addUser(user: UserLdap): Observable<UserLdap> {
    this.users.push(user);
    return of(user);
  }

  updateUser(userToUpdate: UserLdap): Observable<UserLdap | Error> {
    const user = this.users.find((u) => u.login === userToUpdate.login);
    console.log(`${userToUpdate.login}`);

    if (user) {
      user.nom = userToUpdate.nom;
      return of(userToUpdate);
    } else {
      const error = new Error(
        `Utilisateur non trouvé - service (${userToUpdate.login})`
      );
      return of(error);
    }
  }
}
