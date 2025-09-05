import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Users } from '../../../core/interfaces/User';
import { FormControl } from '@angular/forms';

@Component({
 selector: 'app-sign-up',
 imports: [MatLabel, MatCardModule, FormsModule,
   MatFormFieldModule, MatInputModule, MatButtonModule],
 templateUrl: './sign-up.component.html',
 styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
 constructor(private snack: MatSnackBar, private router: Router) { }

 public onSubmit(form: NgForm) {
   if (form.valid) {
     const userData = form.value;
     let users = JSON.parse(localStorage.getItem('users') || '[]');
     if (users.some((u:Users) => u.username === userData.username)) {
       this.snack.open("Username already exists!", "close", { duration: 2000 });
       return;
     }
     users.push(userData);
     localStorage.setItem('users', JSON.stringify(users));
     this.snack.open("Successfully registered", "close", { duration: 2000 });
     this.router.navigate(["/login"]);
   }
 }
}