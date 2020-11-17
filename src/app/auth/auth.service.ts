import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from './user.model';

export interface AuthResponseData {

    idToken: string;
    email: string;
    refreshToken: string;
    expiresIN: string;
    localId: string;
    registered: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // user = new Subject<User>();
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcRiTqsSeYKknzMHGUhXE7DyPKPSSZ680',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handelError), tap(resData => {
            this.handelAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIN
            );
        }));
    }


    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcRiTqsSeYKknzMHGUhXE7DyPKPSSZ680',

            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handelError), tap(resData => {
            this.handelAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIN
            );
        }));
    }

    logout()
    {

    }


    private handelAuthentication(email: string, userId: string, token: string,
        expiresIN: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIN, 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
    }

    private handelError(errorRes: HttpErrorResponse) {
        let errorMsg = "An Unknown Error Occurred";

        if (!errorRes.error || errorRes.error.error) {
            return throwError(errorMsg);
        }

        switch (errorRes.error.error.message) {

            case 'EMAIL_EXISTS': errorMsg = "This Email Already Exists";
                break;

            case 'EMAIL_NOT_FOUND': errorMsg = "This Email does not found";
                break;

            case 'INVALID_PASSWORD': errorMsg = "The PAssword is not correct";
                break;

        }

        return throwError(errorMsg);
    }
}

