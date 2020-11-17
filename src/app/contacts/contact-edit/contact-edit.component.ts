import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from './../../data-storage.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContactService } from './../../contact.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit, OnDestroy {

  userSub: Subscription;

  isAuthenticated = false;
  id: number;
  editMode = false;
  contactform: FormGroup;

  constructor(private conService : ContactService,
    private dsService : DataStorageService,
    private rout : ActivatedRoute,
    private router : Router,
    private authService : AuthService) { }


  submit() {
    if (this.editMode) {
      console.log(this.contactform.value);
      this.conService.updateContact(this.contactform.value, this.id);
    }
    else {
      console.log(this.contactform.value);
      this.conService.newContact(this.contactform.value);
    }

    this.dsService.storeContacts();
    this.cancel();
  }


  cancel() {
    this.router.navigate(['../'], { relativeTo: this.rout });
  }


  private initform() {
    let contactName = '';
    let contactPhone = '';
    let contactEmail = '';
    let contactImage = '';
    let contactGender = '';

    if (this.editMode) {
      const contact = this.conService.getContact(this.id);
      contactName = contact.name;
      contactPhone = contact.phone;
      contactEmail = contact.email;
      contactImage = contact.imagePath;
      contactGender = contact.gender;

    }

    this.contactform = new FormGroup({
      'name': new FormControl(contactName, Validators.required),
      'phone': new FormControl(contactPhone, Validators.required),
      'email': new FormControl(contactEmail),
      'imagePath' : new FormControl(contactImage),
      'gender' : new FormControl(contactGender)
    });
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
          this.editMode = params['id'] != null;
          console.log(this.editMode);
          this.initform();
        }
      );
    }
  }

  ngOnDestroy()
  {
    this.userSub.unsubscribe();
  }

}
