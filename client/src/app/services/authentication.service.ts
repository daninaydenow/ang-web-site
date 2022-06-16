import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSource = new Subject<User>();
  user$ = this.userSource.asObservable();
  constructor(private auth: Auth) {}

  getLocalStorageUser() {
    this.userSource.next(JSON.parse(localStorage.getItem('user')!));
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
}
