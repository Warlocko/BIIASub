import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreAdminService {

  constructor(private firestore: AngularFirestore) { }


  createUserRecord(data) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("users")
            .doc(data.id)
            .set({
              name: data.name,
              email: data.email,
              role: 'user'
            }).then(res => {resolve(res)}, err => reject(err));
    });
  }

  getUserRecord(id) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("users")
            .doc(id)
            .ref
            .get()
            .then(res => {resolve(res.data())}, err => reject(err));
    });
  }

}
