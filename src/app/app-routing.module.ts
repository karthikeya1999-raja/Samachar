import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactStartComponent } from './contacts/contact-start/contact-start.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CallComponent } from './call/call.component';
import { MessageComponent } from './message/message.component';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : '', redirectTo : '/auth', pathMatch : 'full'},
  {
    path : 'contact',
    component : ContactsComponent,
    children : [
      {
        path : '',
        component : ContactStartComponent
      },
      {
        path : 'new',
        component : ContactEditComponent
      },
      {
        path : ':id',
        component : ContactDetailsComponent
      }, 

      {
        path : ':id/edit',
        component : ContactEditComponent
      },
      { 
        path : ':id/message', 
        component : MessageComponent 
      },
      { 
        path : ':id/call', 
        component : CallComponent 
      }
    ]
  },
  { path : 'auth', component : AuthComponent},
  { path : 'message',component : MessageComponent},
  { path : 'call',component : CallComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
