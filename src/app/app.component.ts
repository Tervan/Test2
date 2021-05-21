import { AuthenticationService } from './services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './dto/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentUser!: User;

  testUrl = 'http://localhost:3000';
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    // tslint:disable-next-line: deprecation
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }
  title = 'frontend';
  hello: any;

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // tslint:disable-next-line: deprecation
    this.http.get<any>('http://localhost:3000/').subscribe((data) => {
      this.hello = data.message;
    });
  }
}
