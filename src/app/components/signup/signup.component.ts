import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FireauthService } from 'src/app/services/fireauth.service';
import { FirestoreAdminService} from '../../services/firestore-admin.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  mailSignup : boolean = false;
  googleSignup : boolean = false;
  facebookSignup : boolean = false;
  errorText: string = "";
  constructor(public firebaseAuth : AngularFireAuth, private router: Router, private firestore: FirestoreAdminService, public fireauth: FireauthService) { }

  ngOnInit(): void {
  }

  toggleMail() {
    this.mailSignup = !this.mailSignup;
    this.errorText = "";
  }

  toggleGoogleSignup() {
    this.googleSignup = !this.googleSignup;
    this.errorText = "";
  }

  toggleFacebookSignup() {
    this.facebookSignup = !this.facebookSignup;
    this.errorText = "";
  }

  createUser(name:string,mail:string,password:string){
    if(name!=""){
      this.firebaseAuth.createUserWithEmailAndPassword(mail,password).then(user => {
        var uid = user.user.uid
        this.firestore.createUserRecord({id:uid,name:name,email:mail}).then(() =>{
          this.router.navigate(['/login'])
        })
      }
    ).catch(err => {
      if(err.code == "auth/invalid-email" || err.code == "auth/wrong-password"){
        this.errorText = "El correo o la contraseña ingresados no son válidos."
      }else if(err.code == "auth/email-already-in-use"){
        this.errorText = "Este correo ya se encuentra en uso."
      }else if(err.code == "auth/weak-password"){
        this.errorText = "La contraseña debe contener un mínimo de 6 caracteres"
      }
      console.log(err)
    })}else{
      this.errorText = "Por favor ingresa un nombre."
  }
}

  async SignupWithGoogle(name){
    if(name!=""){
      this.fireauth.googleSignUp(name).then((created:any) => {
        if(!created){
          alert('Ya existe una cuenta asociada a este correo')
        }else{
          this.router.navigate(['/dashboard'])
        }
      })
    }else{
      this.errorText = "Por favor ingresa un nombre"
    }
  }

  SignUpWithFacebook(name){
    if(name!=""){
      this.fireauth.facebookSignUp(name).then(created => {
        if(!created){
          alert('Ya existe una cuenta asociada a este correo')
        }else{
          this.router.navigate(['/dashboard'])
        }
      })
    }else{
      this.errorText = "Por favor ingresa un nombre"
    }
    
  }

}
