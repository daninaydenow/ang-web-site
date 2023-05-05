import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import {
  collection,
  Firestore,
  collectionData,
  doc,
  docData,
  addDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Adress } from '../model/Adress.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly auth: Auth,
    private readonly firestore: Firestore
  ) {}

  getUserAdress(): Observable<Adress> {
    return docData(
      doc(this.firestore, `userAdress/${this.auth.currentUser?.uid}`)
    ) as Observable<Adress>;
  }
}
