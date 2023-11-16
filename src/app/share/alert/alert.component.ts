import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Input() type: string;
  cssClass: string[] = ['alert', 'alert-dismissible', 'fade'];

  constructor() {
    this.type = 'info';
  }

  ngOnInit(): void {
    let alertString = 'alert-info'; // Correction: Utiliser "alertString" au lieu de "alert"
    switch (this.type) {
      case 'success': // Correction: Utiliser 'success' au lieu de 'succes'
        alertString = 'alert-success';
        break;
      case 'danger':
        alertString = 'alert-danger';
        break;
      case 'warning':
        alertString = 'alert-warning';
        break;
    }
    this.cssClass.push(alertString); // Correction: Utiliser "alertString" au lieu de "alert"
  }

  removeAlert() {
    this.cssClass = ['alert-hide'];
  }
}
