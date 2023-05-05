import {
  Auth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  updateProfile,
  User,
  user,
} from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSource = new BehaviorSubject<IUser>(
    JSON.parse(localStorage.getItem('user')!)
  );

  constructor(private auth: Auth) {}

  isAuthenticated(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  setUser(user: IUser): void {
    this.userSource.next(user);
  }

  getUser(): Observable<IUser> {
    return this.userSource.asObservable();
  }

  getFirebaseUser(): Observable<User | null> {
    return user(this.auth);
  }

  updateUserProfile(userData: any): Promise<void> {
    return updateProfile(this.auth.currentUser!, userData);
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
