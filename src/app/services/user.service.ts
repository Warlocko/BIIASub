import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface user {
  id?: string,
  name: string,
  email: string,
  role: string,
  gDisp: number,
  gPen: number,
  gTot: number
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users:Observable<user[]>;
  private user;
  private usersCollection: AngularFirestoreCollection<user>;

  constructor(private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<user>('users');
   }


  getUserById(id:string): Observable<user>{
    return this.usersCollection.doc<user>(id).valueChanges().pipe(
      take(1),
      map(user => {
        user.id = id;
        return user
      })
    );

  }


}
