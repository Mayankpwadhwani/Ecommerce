import { Component } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField,MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  imports: [MatLabel,MatCardModule,FormsModule,
    MatFormField,MatInputModule,MatButtonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

constructor(private snack:MatSnackBar,private router:Router){}
//functions
  onSubmit(form: NgForm){
    if(form.valid){
      const userData=form.value;
      localStorage.setItem(userData.username,JSON.stringify(userData));
    this.snack.open("Successfully registered","close")
    this.router.navigate(["/login"])
  }
}
}
