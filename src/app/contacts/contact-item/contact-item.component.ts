import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from './../contact.model';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit, OnDestroy {

  userSub : Subscription;

  isAuthenticated = false;
  @Input() contact : Contact;
  @Input() index : number;

  constructor(private router : Router,
    private authService : AuthService) { }

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
