import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app'
import { of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

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
    return (await this.afs.collection('users').doc(credential.user.uid).ref.get()).exists
  }

  async googleSignUp(name) {
    const provider = new firebase.auth.GoogleAuthProvider()
    const credential = await this.firebaseAuth.signInWithPopup(provider)
    return await this.updateUserData(credential.user,name)
  }

  async facebookSignIn(){
    const provider = new firebase.auth.FacebookAuthProvider()
    const credential = await this.firebaseAuth.signInWithPopup(provider)
    return (await this.afs.collection('users').doc(credential.user.uid).ref.get()).exists
  }

  async facebookSignUp(name){
    const provider = new firebase.auth.FacebookAuthProvider()
    const credential = await this.firebaseAuth.signInWithPopup(provider)
    return this.updateUserData(credential.user,name)
  }

  private async updateUserData(user,name){
    console.log("Updating")
    var document = this.afs.collection('users').doc(user.uid);
    if(!(await document.ref.get()).exists){
      console.log('Not finding')
      var userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`)
      const data = {
      email: user.email,
      name:name,
      hasPaypal: false,
      role: "user"
      }
      await userRef.set(data, {merge: true})
      return true
    }else{
      return false;
    }
      
    }

}
