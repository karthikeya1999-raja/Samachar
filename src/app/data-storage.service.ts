import { ContactService } from './contact.service';
import { PeerService } from './peer.service';
import { Contact } from './contacts/contact.model';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap , take, exhaustMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http : HttpClient, 
    private conService : ContactService,
    private prService :PeerService) { }

  storeContacts() {
    const contact = this.conService.getContacts();
    const peerId = this.prService.peerId;

      this.http.put('https://samachar-b2961.firebaseio.com/'+peerId+'/contacts.json',contact)
    .subscribe(
       response => {
         console.log(response);
       }
    );
  }

  fetchContacts(){
    const peerId = this.prService.peerId;
    
      return this.http.get<Contact[]>('https://samachar-b2961.firebaseio.com/' + peerId + '/contacts.json')
        .pipe(map(contacts => {

          try {
            return contacts.map(contact => {
              return { ...contact };
            });
          } catch (error) {
            console.log("No contacts have been saved yet");
            this.conService.makeEmpty();
          }
        }), tap(contacts => {
          try {
            console.log(contacts);
            this.conService.setContacts(contacts);
          } catch (error) {}
        }));
  }
}
