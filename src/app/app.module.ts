import { DataStorageService } from './data-storage.service';
import { ContactService } from './contact.service';
import { PeerService } from './peer.service';

import { DropDownDirective } from './drop-down.directive';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeadComponent } from './head/head.component';
import { MessageComponent } from './message/message.component';
import { CallComponent } from './call/call.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactStartComponent } from './contacts/contact-start/contact-start.component';


@NgModule({
  declarations: [
    DropDownDirective,
    AppComponent,
    AuthComponent,
    HeadComponent,
    MessageComponent,
    CallComponent,
    ContactsComponent,
    ContactListComponent,
    ContactItemComponent,
    ContactDetailsComponent,
    ContactEditComponent,
    ContactStartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [PeerService, ContactService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
