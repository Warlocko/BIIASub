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
  reembolsosPending
  reembolsosDone

  constructor(public firebaseAuth : AngularFireAuth, private router: Router, public firestore: FirestoreAdminService) { }

  ngOnInit(): void {
    this.firestore.getReembolsosPending().subscribe(res => {
      this.reembolsosPending = res.sort(this.compare)
    })
    this.firestore.getReembolsosDone().subscribe(res => {
      this.reembolsosDone = res.sort(this.compare)
    })
  }

  compare( a, b ) {
    if ( a.time > b.time ){
      return -1;
    }
    if ( a.time < b.time ){
      return 1;
    }
    return 0;
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

  checkReembolso(id){
    this.firestore.checkReembolso(id)
  }

  onLogout(){
    this.firebaseAuth.signOut().then(() =>{
        this.router.navigate(['login'])
      }
    )
  }

}
