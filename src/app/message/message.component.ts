import { Contact } from './../contacts/contact.model';
import { ContactService } from './../contact.service';
import { AuthService } from './../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { PeerService } from './../peer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  userSub : Subscription;

  isAuthenticated = false;
  id: string = this.prService.peerId;
  receiverId : string;
  receiverName : string;
  smsg : string;
  rmsg : string;
  nid : number;
  contact : Contact;

  constructor(private prService : PeerService,
    private router : Router,
    private authService : AuthService,
    private rout : ActivatedRoute,
    private conService : ContactService) { }

  sendMessage()
  {
    this.prService.sendMessage(this.receiverId,this.smsg);
  }

  receiveMessage()
  {
    this.prService.reciveMessage();
  }

  ngOnInit(): void
  {
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
          try {
            this.nid = +params['id'];
            this.contact = this.conService.getContact(this.nid);
            this.receiverId = this.contact.phone;
            this.receiverName = this.contact.name;
          } catch (error) {}
        });

      this.prService.rmsg.subscribe(
        msg => {
          this.rmsg = msg;
        }
      );
    }

  }

}
