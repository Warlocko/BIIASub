import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  uid
  name
  email
  password
  constructor(public firebaseAuth : AngularFireAuth, private router:Router, private userService: UserService) { }

  ngOnInit(): void {
    this.firebaseAuth.currentUser.then(user =>{
      this.uid = user.uid;
      this.userService.getUserById(this.uid).subscribe(res => {
      this.name = res.name;
      this.email = res.email;
      })
    })
  }

  onLogout(){
    this.firebaseAuth.signOut().then(() =>{
        this.router.navigate(['login'])
      }
    )
  }

}
