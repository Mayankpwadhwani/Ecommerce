import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Users } from '../../../core/interfaces/User';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterOutlet, MatCardModule, MatInputModule,
    MatLabel, MatFormField, FormsModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  constructor(private snack: MatSnackBar, private router: Router, private fb: FormBuilder) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
    })
  }

  public onSubmit(loginForm: FormGroup) {
    const { email, password } = loginForm.value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: Users) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('token', 'dummy_token');
      localStorage.setItem('currentUser', user.email)
      this.snack.open("Login Successful", "close", { duration: 2000 });
      this.router.navigate(['/products']);
    } else {
      this.snack.open("Invalid email or password", "close", { duration: 2000 });
    }
  }
}
