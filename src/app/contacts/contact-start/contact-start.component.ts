import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-contact-start',
  templateUrl: './contact-start.component.html',
  styleUrls: ['./contact-start.component.css']
})
export class ContactStartComponent implements OnInit, OnDestroy {

  constructor(private authService : AuthService,private router : Router,) { }

  userSub : Subscription;
  isAuthenticated = false;

  ngOnInit(): void {

     this.userSub = this.authService.user.subscribe(
       user => {
         this.isAuthenticated = !!user;
       }
     );

     if(!this.isAuthenticated)
     {
       this.router.navigate(['/auth']);
     }
  }

  ngOnDestroy()
  {
    this.userSub.unsubscribe(); 
  }

}
