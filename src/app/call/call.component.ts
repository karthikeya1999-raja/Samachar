import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import Peer,{ MediaConnection } from 'peerjs';
import { PeerService } from './../peer.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contacts/contact.model';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {

  @ViewChild('vedio') vedio : ElementRef;
  userSub : Subscription;

  isAuthenticated = false;
  myid : string;
  receiver : string;
  nid : number;
  contact : Contact;
  peer : Peer;
  isCallOn = false;


  constructor(private prService : PeerService,
    private authService : AuthService,
    private router : Router,
    private conService : ContactService,
    private rout : ActivatedRoute) { }

    onVedioCall()
    {
      document.getElementById('vedio').style.display = 'block';
      this.isCallOn = true;
      this.prService.makeCall(this.receiver,this.vedio, true);
    }

    onAudioCall()
    {
      document.getElementById('vedio').style.display = 'block';
      this.isCallOn = true;
      this.prService.makeCall(this.receiver, this.vedio, false);
    }

    answer()
    {
      document.getElementById('vedio').style.display = 'block';
      this.prService.answerCall(this.vedio);
    }

    onEnd()
    {
      document.getElementById('vedio').style.display = 'none';
      this.prService.disconnectCall();
      this.isCallOn = false;
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
    else{

      try{
        setTimeout(() => {
          this.answer();
        },150);
      }catch(err){}

      this.prService.call.subscribe(
        call => {
          this.isCallOn = call;
        }
      );

      this.rout.params.subscribe(
        (params: Params) => {
          try {
            this.nid = +params['id'];
            this.contact = this.conService.getContact(this.nid);
          } catch (error) { }
        });
    }

  }

}
