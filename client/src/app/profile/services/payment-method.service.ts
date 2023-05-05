import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  collection,
  Firestore,
  collectionData,
  doc,
  docData,
  addDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { PaymentMethod } from '../model/paymentMethod.model';
import { Auth } from '@angular/fire/auth';
import { DocumentData, DocumentReference, deleteDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  deleteCard(id: string): Promise<void> {
    return deleteDoc(
      doc(
        this.firestore,
        `paymentMethods/${this.auth.currentUser?.uid}/cards/${id}`
      )
    );
  }

  addCard(method: PaymentMethod): Promise<DocumentReference<DocumentData>> {
    return addDoc(
      collection(
        this.firestore,
        `paymentMethods/${this.auth.currentUser?.uid}/cards`
      ),
      method
    );
  }

  getUserPaymentMethods(): Observable<PaymentMethod[]> {
    return collectionData(
      collection(
        this.firestore,
        `paymentMethods/${this.auth.currentUser?.uid}/cards`
      ),
      { idField: 'id' }
    ) as Observable<PaymentMethod[]>;
  }

  getCurrentlyUsedPaymentMethod(): Observable<{ currentlyUsed: string }> {
    return docData(
      doc(this.firestore, `paymentMethods/${this.auth.currentUser?.uid}`)
    ) as Observable<{ currentlyUsed: string }>;
  }

  changeCurrentlyUsedPaymentMethod(cardId: string): Promise<void> {
    return updateDoc(
      doc(this.firestore, `paymentMethods/${this.auth.currentUser?.uid}`),
      { currentlyUsed: cardId }
    );
  }
}
