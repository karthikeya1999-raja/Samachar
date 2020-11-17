import { PeerService } from './../../peer.service';
import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContactService } from './../../contact.service';
import { Contact } from './../contact.model';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  @ViewChild('vedio') vedio : ElementRef;

  @HostListener('window:keyup',['$event'])
  keyEvent(event : KeyboardEvent)
  {
    if(event.keyCode == 37){
      this.previous();
    }
    if(event.keyCode == 39){
      this.next();
    }
    if(event.keyCode == 27){
      this.back();
    }
  }

  userSub: Subscription;
  onCall = false;

  isAuthenticated = false;
  id : number;
  contact : Contact;
  receiver : string;

  constructor(private conService : ContactService,
    private rout : ActivatedRoute,
    private router : Router,
    private authService : AuthService,
    private prService : PeerService) { }


  onEditContact() {
    this.router.navigate(['edit'], { relativeTo: this.rout });
  }

  onDeleteContact() {
    this.conService.deleteContact(this.id);
    this.router.navigate(['/contact']);
  }

  onMessage(){
    this.router.navigate(['message'],{relativeTo : this.rout});
  }

  onAudioCall()
  {
    document.getElementById('vedio').style.display = 'block';
    this.onCall = true;
    this.prService.makeCall(this.receiver, this.vedio, false);
  }

  onVedioCall()
  {
    document.getElementById('vedio').style.display = 'block';
    this.onCall = true;
    this.prService.makeCall(this.receiver, this.vedio, true);
  }

  endCall()
  {
    document.getElementById('vedio').style.display = 'none';
    this.prService.disconnectCall();
    this.onCall = false;
  }

  back()
  {
    this.router.navigate(['../'], { relativeTo: this.rout });
  }

  next()
  {
    var newId = this.id+1;
    if(newId == this.conService.contacts.length){}
    else{
      this.router.navigate(['../' + newId], { relativeTo: this.rout });
    }
  }

  previous()
  {
    var newId = this.id-1;
    if(newId < 0){}
    else{
      this.router.navigate(['../' + newId], { relativeTo: this.rout });
    }
  }

  ngOnInit(): void {

    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });

    if(!this.isAuthenticated)
    {
      this.router.navigate(['/auth']);
    }
    else
    {
      this.rout.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.contact = this.conService.getContact(this.id);
          this.receiver = this.contact.phone;
        });
    }
  }

  ngOnDestroy()
  {
    this.userSub.unsubscribe();
  }

}
