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
  passwordReset:boolean = false;
  errorText: string = "";

  constructor(public firebaseAuth : AngularFireAuth, private router: Router, private firestore: FirestoreAdminService, public fireauth: FireauthService) { }

  ngOnInit(): void {
  }

  toggleMail(){
    this.mailLogin = !this.mailLogin
    this.errorText = ""
  }

  toggleReset(){
    this.passwordReset = !this.passwordReset
    this.errorText = ""
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
    }).catch(err => {
      if(err.code == "auth/invalid-email" || err.code == "auth/wrong-password"){
        this.errorText = "El correo o la contraseña ingresados no son válidos."
      }
      console.log(err)
    })
  }

  LoginWithGoogle(){
    this.fireauth.googleSignIn().then(exists => {
      if(exists){
        this.router.navigate(['/dashboard'])
      }else{
        alert('Cuenta no encontrada. Favor de registrarse antes de iniciar sesión.')
      }
    })
  }

  LoginWithFacebook(){
    this.fireauth.facebookSignIn().then(exists => {
      if(exists){
        this.router.navigate(['/dashboard'])
      }else{
        alert('Cuenta no encontrada. Favor de registrarse antes de iniciar sesión.')
      }
    })
  }

  resetPassword(email){
    this.firebaseAuth.sendPasswordResetEmail(email).then(() => {
      alert('Se ha enviado un correo de restablecimiento a tu cuenta.')
      this.passwordReset = false;
    },err => {
      if(err.code == "auth/invalid-email"){
        this.errorText = "El correo o la contraseña ingresados no son válidos."
      }else if(err.code == "auth/user-not-found"){
        this.errorText = "No se encontró un usuario con ese correo."
      }
    })
  }

}
