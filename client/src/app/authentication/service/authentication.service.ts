import {
  Auth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSource = new BehaviorSubject<User>(
    JSON.parse(localStorage.getItem('user')!)
  );

  constructor(private auth: Auth) {}

  isAuthenticated(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  getUser(): Observable<User> {
    return this.userSource.asObservable();
  }

  getLocalStorageUser() {
    this.userSource.next(JSON.parse(localStorage.getItem('user')!));
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    return signOut(this.auth);
  }
}
