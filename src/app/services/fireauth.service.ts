import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app'
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  isLoggedIn = false
  user$
  constructor(public firebaseAuth : AngularFireAuth, private afs: AngularFirestore) { 
    this.user$ = this.firebaseAuth.authState.pipe(
      switchMap(user => {
        if (user){
          return this.afs.doc<any>("users/${user.uid}").valueChanges()
        } else{
          return of(null)
        }
      })
    )
  }
  async signin(email: string, password:string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider()
    const credential = await this.firebaseAuth.signInWithPopup(provider)
    return this.updateUserData(credential.user)
  }

  private updateUserData(user){
    var userRef: AngularFirestoreDocument<any> = this.afs.doc("users/${user.uid}")
    //firebase.auth().currentUser
    console.log(user.uid)
    const data = {
      uid: user.uid,
      email: user.email
    }

    return userRef.set(data, {merge: true})

  }

}
