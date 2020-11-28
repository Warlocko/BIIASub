import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

export interface user {
  id?: string,
  name: string,
  email: string,
  role: string,
  gDisp: number,
  gPen: number,
  gTot: number,
  paypal: string,
  hasPaypal: boolean
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users:Observable<user[]>;
  private user;
  private usersCollection: AngularFirestoreCollection<user>;
  balance:number = 0

  constructor(private afs: AngularFirestore, public firebaseAuth : AngularFireAuth) {
    this.usersCollection = this.afs.collection<user>('users');
   }


  getUserById(id:string): Observable<user>{
    return this.usersCollection.doc<user>(id).valueChanges().pipe(
      map(user => {
        user.id = id;
        return user
      })
    )}

  changeName(userId,name){
    this.afs.collection('users').doc(userId).update({name:name})
  }

  savePaypal(userId, account){
    this.afs.collection('users').doc(userId).update({paypal:account, hasPaypal: true})
  }

  createAccount(userID,userName,accountID,brokerName,brokerPath){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var time = today.getHours() + ':' + String(today.getMinutes()).padStart(2, '0')

    var date = dd + '/' + mm + '/' + yyyy + " a las "+ time
    return new Promise<any>((resolve, reject) =>{
      this.afs.collection("accounts").add({
            userID: userID,
            name: userName,
            accountID: accountID,
            broker: brokerName,
            brokerPath: brokerPath,
            time: date,
            balance: this.balance,
            isActive: false
          }).then(res => {resolve(res)}, err => reject(err));
    });
  }

  createReembolso(accountRef,userID,balance,amount:number,brokerName,brokerPath,accountID,paypal,name){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var time = today.getHours() + ':' + String(today.getMinutes()).padStart(2, '0')

    var date = dd + '/' + mm + '/' + yyyy + " a las "+ time
    var newBalance = balance - amount

    this.afs.collection('accounts').doc(accountID).update({balance:newBalance})

    return new Promise<any>((resolve, reject) =>{
      this.afs.collection("reembolsos").add({
            userID: userID,
            userName: name,
            accountID: accountID,
            accountRef: accountRef,
            broker: brokerName,
            brokerPath: brokerPath,
            time: date,
            amount: amount,
            pending: true,
            paypal: paypal
          }).then(res => {resolve(res)}, err => reject(err));
    });
  }

}
