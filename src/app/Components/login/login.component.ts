import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink,RouterOutlet,MatCardModule,MatInputModule,
    MatLabel,MatFormField,FormsModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  //variables
  constructor(private snack:MatSnackBar,private router:Router){}

  //lifecyclehooks
  onSubmit(form: NgForm){
   const {username,password}=form.value;
   if (username && password){
    localStorage.setItem('token','dummy_token');
    this.snack.open("Success","close")
   }else {
    this.snack.open("Enter valid credentials","close")
   }
  }
}
