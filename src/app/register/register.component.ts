import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // checks if username and password have minimum lenght of 6 characters
    // username and password are required
    this.registerForm = this.formBuilder.group({
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      confirmPassword: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['/'];
  }

  get f() {
    return this.registerForm.controls;
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    // checks if password and confirmpassword are equal
    if (this.f.password.value !== this.f.confirmPassword.value) {
      this.error = 'Passwords are not equal';
      return;
    }

    this.userService
      .registerUser(this.f?.username.value, this.f?.password.value)
      // tslint:disable-next-line: deprecation
      .subscribe(
        (data) => {
          this.router.navigate(['/login']);
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
