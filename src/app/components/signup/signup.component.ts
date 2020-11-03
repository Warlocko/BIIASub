import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirestoreAdminService} from '../../services/firestore-admin.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  mailSignup : boolean = false;
  constructor(public firebaseAuth : AngularFireAuth, private router: Router, private firestore: FirestoreAdminService) { }

  ngOnInit(): void {
  }

  toggleMail() {
    this.mailSignup = !this.mailSignup;
  }

  createUser(name:string,mail:string,password:string){
    this.firebaseAuth.createUserWithEmailAndPassword(mail,password).then(user => {
      var uid = user.user.uid
      this.firestore.createUserRecord({id:uid,name:name,email:mail}).then(() =>{
        console.log("Created")
        this.router.navigate(['/login'])
      })
    }
  )
    
}

}
