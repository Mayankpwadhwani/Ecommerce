import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup, FormControl, } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Users } from '../../../core/interfaces/User';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatCardModule,
    MatFormFieldModule,
    MatInputModule, MatButtonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup<{
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    username: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  constructor(private fb: FormBuilder, private snack: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      email: this.fb.control('', [
        Validators.required,
        Validators.email,
        this.gmailValidator.bind(this),
      ]),
      username: this.fb.control('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(5),
        this.passwordValidator.bind(this),
      ]),
    });
  }

  public gmailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (value && !value.endsWith('@gmail.com')) {
      return { gmail: true };
    }
    return null;
  }

  public passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (value) {
      const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      if (value.length > 10 || !specialChar) {
        return { invalidPassword: true };
      }
    }
    return null;
  }

 public onSubmit(): void {
 if (this.signupForm.valid) {
   const rawData = this.signupForm.getRawValue() as Omit<Users, 'id'>;
   let users: Users[] = JSON.parse(localStorage.getItem('users') || '[]');
   if (users.some((u: Users) => u.username === rawData.username)) {
     this.snack.open('Username already exists!', 'close', {
       duration: 2000,
     });
     return;
   }
   const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
   const userData: Users = {
     id: newId,
     ...rawData,
   };
   users.push(userData);
   localStorage.setItem('users', JSON.stringify(users));
   this.snack.open('Successfully registered', 'close', { duration: 2000 });
   this.router.navigate(['/login']);
 }
}
}