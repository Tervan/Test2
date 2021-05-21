import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  // returned true wenn User ist angemledet, returned false wenn User nicht angemeldet ist
  // tslint:disable-next-line: typedef
  isLoggedIn() {
    const currentUser = this.authenticationService.currentUserValue;
    // Überprüft ob currentUser && ob es keine leere Menge besitzt
    if (currentUser && Object.keys(currentUser).length !== 0) {
      return true;
    } else {
      return false;
    }
  }
  // User logout
  // tslint:disable-next-line: typedef
  logout() {
    this.authenticationService.logout();
  }
}
