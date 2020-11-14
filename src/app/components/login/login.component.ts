import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirestoreAdminService } from 'src/app/services/firestore-admin.service';
import { FireauthService } from 'src/app/services/fireauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mailLogin : boolean = false;

  constructor(public firebaseAuth : AngularFireAuth, private router: Router, private firestore: FirestoreAdminService, public fireauth: FireauthService) { }

  ngOnInit(): void {
  }

  toggleMail(){
    this.mailLogin = !this.mailLogin
  }

  Login(email:string,password:string){
    this.firebaseAuth.signInWithEmailAndPassword(email,password).then(user => {
      var uid = user.user.uid
      this.firestore.getUserRecord(uid).then(data => {
        console.log(data)
        if(data.role=='admin'){
          this.router.navigate(['/admin/reembolsos'])
        }else {
          this.router.navigate(['/dashboard'])
        }
      })
      
    })
  }

  LoginWithGoogle(){
    console.log("google")
    this.fireauth.googleSignIn().then(user => {
      this.router.navigate(['/dashboard'])
    })
  }

}
