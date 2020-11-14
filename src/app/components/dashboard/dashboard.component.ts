import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import * as firebase from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  uid;
  user;
  gDisp:number;
  gPen:number;
  gTot:number;
  noPaypal:boolean = true;

  constructor(public firebaseAuth : AngularFireAuth, private router:Router, private userService: UserService) { 
      
    
  }

  ngOnInit(): void {
    this.firebaseAuth.currentUser.then(user =>{
      this.uid = user.uid;
      this.userService.getUserById(this.uid).subscribe(res => {
        this.user = res;
        this.gDisp = res.gDisp;
        this.gPen = res.gPen;
        this.gTot = res.gTot;
      })
    })
  }

}
