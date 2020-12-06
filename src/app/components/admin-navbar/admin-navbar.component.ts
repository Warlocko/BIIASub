import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {
  @Input() currentTab:number;
  name:string;
  uid

  constructor(public firebaseAuth : AngularFireAuth, private router:Router, private userService: UserService) { 
    
  }

  ngOnInit(): void {
    this.firebaseAuth.currentUser.then(user =>{
      this.uid = user.uid;
      if(this.currentTab<5){
        document.getElementsByClassName('navbar-link')[this.currentTab].classList.add('navbar-selected')
      }
      this.userService.getUserById(this.uid).subscribe(res => {
      this.name = res.name;
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
