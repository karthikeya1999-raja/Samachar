import { PeerService } from './../peer.service';
import { DataStorageService } from './../data-storage.service';
import { Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit,OnDestroy {

  @ViewChild('vedio') vedio : ElementRef;

  constructor(private authService : AuthService,
    private router : Router,
    private dsService : DataStorageService,
    private prService : PeerService) { }

    usersub : Subscription;
    isAuthenticated = false;
    sender : string = "";
    msg : string = "";
    isCallOn = false;

  answer() {
    document.getElementById('div').style.display = 'block';
    document.getElementById('vedio').style.display = 'block';
    this.prService.answerCall(this.vedio);
  }

  onEnd()
  {
    document.getElementById('div').style.display = 'none';
    document.getElementById('vedio').style.display = 'none';
    this.prService.disconnectCall();
    this.isCallOn = false;
  }

  ngOnInit(): void {

    this.usersub = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
      }
    );

    if(!this.isAuthenticated)
    {
      this.router.navigate(['/auth']);
    }
    else
    {
      try {
        setTimeout(() => {
          this.answer();
        }, 150);
      } catch (err) { }

      this.prService.call.subscribe(
        call => {
          this.isCallOn = call;
        }
      );

       this.dsService.fetchContacts().subscribe();
       this.prService.reciveMessage();
       this.prService.pr.subscribe(
         sender => {
           this.sender = sender;
         }
       );
       this.prService.rmsg.subscribe(
         msg => {
           this.msg = msg;
         }
       );

       try {
        setTimeout(() => {
          if (this.msg.length > 0 && this.sender.length > 0) {
            console.log("Mesage received from " + this.sender);
            console.log("Message is " + this.msg);
          }
        },500)
       } catch (error) {}
    }
  }

  ngOnDestroy()
  {
    this.usersub.unsubscribe();
  }

}
