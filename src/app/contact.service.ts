import { Contact } from './contacts/contact.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ContactService{

    contacts : Contact[] = [];
    contactChanged = new Subject<Contact[]>();

    constructor() {}

    makeEmpty()
    {
        this.contacts = [];
        this.contactChanged.next(this.contacts.slice());
    }

    setContacts(contacts : Contact[])
    {
       this.contacts = contacts;
       this.contactChanged.next(this.contacts.slice());
    }

    getContacts()
    {
       return this.contacts.slice();
    }

    getContact(id : number)
    {
        return this.contacts[id];
    }
    
    newContact(con : Contact)
    {
       this.contacts.push(new Contact(con.name,con.phone,con.gender,con.email,con.imagePath));
       this.contactChanged.next(this.contacts.slice());
    }

    deleteContact(index : number)
    {
        this.contacts.splice(index,1);
        this.contactChanged.next(this.contacts.slice());
    }

    updateContact(con : Contact,index : number)
    {
        console.log(con);
        this.contacts[index] = con;
        this.contactChanged.next(this.contacts.slice());
    }
}