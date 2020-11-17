import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private authService : AuthService,private router : Router) { }

  logout()
  {
    this.router.navigate(['/auth']);
    this.isAuthenticated = false;
  }

  ngOnInit(): void {

    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

}
