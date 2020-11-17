import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../../contact.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  constructor(
    private conService: ContactService,
    private router: Router,
    private rout: ActivatedRoute,
    private authService : AuthService) { }


  contacts: Contact[] = [];
  subscription: Subscription;
  userSub: Subscription;
  isAuthenticated = false;

  onNewContact() {
    this.router.navigate(['new'], { relativeTo: this.rout });
  }
  
  ngOnInit(): void {

    this.userSub = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
      }
    );

    if(!this.isAuthenticated)
    {
      this.router.navigate(['/auth'], { relativeTo: this.rout });
    }
    else
    {
      setTimeout(() => {
        try {
          this.contacts = this.conService.getContacts();
        } catch (error) {}
        }, 1000);
      this.subscription = this.conService.contactChanged.subscribe(
        (con: Contact[]) => {
          this.contacts = con;
        }
      );
    }
  }

  ngOnDestroy() {
    if(this.isAuthenticated)
    {
      this.subscription.unsubscribe();
      this.userSub.unsubscribe();
    }
  }

}
