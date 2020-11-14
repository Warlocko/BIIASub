import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirestoreAdminService } from 'src/app/services/firestore-admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(public firebaseAuth : AngularFireAuth, private router: Router, public firestore: FirestoreAdminService) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.firebaseAuth.signOut().then(() =>{
        this.router.navigate(['login'])
      }
    )
  }

}
