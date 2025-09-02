import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterModule, } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,MatToolbar,MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
constructor(private router:Router){}
get isLoggedIn():boolean{
  return!!
  localStorage.getItem('token');
}

logOut(){
  localStorage.removeItem('token')
  this.router.navigate(['/login'])
}

}
