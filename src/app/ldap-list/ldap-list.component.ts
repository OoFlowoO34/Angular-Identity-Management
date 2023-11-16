import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserLdap } from '../models/user-ldap';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.css'],
})
export class LdapListComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet', 'mail', 'employeNumero'];
  dataSource = new MatTableDataSource<UserLdap>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | null;
  unactiveSelected: any;

  constructor(private usersService: UsersService, private router: Router) {
    this.paginator = null;
  }
  ngOnInit(): void {
    console.log('Values on ngOnInit(): ');
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: UserLdap, filter: string) =>
      this.filterPredicate(data, filter);
    this.getUsers();
    console.log('Mat Paginator: ', this.paginator);
  }

  filterPredicate(data: UserLdap, filter: string): boolean {
    return !filter || data.nomComplet.toLocaleLowerCase().startsWith(filter);
  }
  applyFilter($event: KeyboardEvent): void {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  private getUsers(): void {
    this.usersService.getUsers().subscribe((users) => {
      if (this.unactiveSelected) {
        this.dataSource.data = users.filter((user) => !user.active);
      } else {
        this.dataSource.data = users;
      }
    });
  }

  unactiveChanged($event: MatSlideToggleChange): void {
    this.unactiveSelected = $event.checked;
    this.getUsers();
  }

  edit(login: string): void {
    this.router.navigate(['users/', login]).then((e) => {
      if (!e) {
        console.error('Navigation has failed !');
      }
    });
  }

  addUser() {
    this.router.navigate(['/user/add']).then((e) => {
      if (!e) {
        console.log('Navigation has failed');
      }
    });
  }
}
