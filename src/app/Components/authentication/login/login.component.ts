import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
   MatLabel, MatFormField, FormsModule, MatButtonModule],
 templateUrl: './login.component.html',
 styleUrl: './login.component.scss'
})
export class LoginComponent {
 constructor(private snack: MatSnackBar, private router: Router) {}

 public onSubmit(form: NgForm) {
   const { username, password } = form.value;
   const users = JSON.parse(localStorage.getItem('users') || '[]');
   const user = users.find((u:Users) => u.username === username && u.password === password);
   if (user) {
     localStorage.setItem('token', 'dummy_token');
     this.snack.open("Login Successful", "close", { duration: 2000 });
     this.router.navigate(['/products']);
   } else {
     this.snack.open("Invalid username or password", "close", { duration: 2000 });
   }
 }
}
