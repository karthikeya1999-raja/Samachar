import { PeerService } from './../peer.service';
import { AuthResponseData, AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLOading = false;
  error: string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  submit(form: NgForm) {
    console.log(form);
    if (!form.valid)
      return;

    const email = form.value.email;
    const password = form.value.password;
    this.prService.createPeer(form.value.phone);

    let authObs: Observable<AuthResponseData>;

    this.isLOading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    }
    else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(resData => {
      console.log(resData);
      this.isLOading = false;
      this.router.navigate(['/contact']);
    },
      errorRes => {
        console.log(errorRes);
        this.error = errorRes;
        this.isLOading = false;
      });

    form.reset();
  }

  constructor(private authService: AuthService, 
    private router: Router, 
    private prService :PeerService) { }

  ngOnInit(): void {
  }

}
