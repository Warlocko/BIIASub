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
  pendientes = true;
  realizados = false;

  constructor(public firebaseAuth : AngularFireAuth, private router: Router, public firestore: FirestoreAdminService) { }

  ngOnInit(): void {
  }

  showPendientes(){
    this.pendientes = true;
    this.realizados = false;
    document.getElementsByClassName('selected-tab')[0].classList.remove('selected-tab');
    document.getElementById('pendientes').classList.add('selected-tab');
  }

  showRealizados(){
    this.pendientes = false;
    this.realizados = true;
    document.getElementsByClassName('selected-tab')[0].classList.remove('selected-tab');
    document.getElementById('realizados').classList.add('selected-tab');
  }

  onLogout(){
    this.firebaseAuth.signOut().then(() =>{
        this.router.navigate(['login'])
      }
    )
  }

}
