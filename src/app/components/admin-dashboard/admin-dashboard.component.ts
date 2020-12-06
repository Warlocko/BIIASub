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
  reembolsosPendingFiltered
  reembolsosDone
  reembolsosDoneFiltered

  constructor(public firebaseAuth : AngularFireAuth, private router: Router, public firestore: FirestoreAdminService) { }

  ngOnInit(): void {
    this.firestore.getReembolsosPending().subscribe(res => {
      this.reembolsosPending = res.sort(this.compare)
      this.reembolsosPendingFiltered = this.reembolsosPending
    })
    this.firestore.getReembolsosDone().subscribe(res => {
      this.reembolsosDone = res.sort(this.compare)
      this.reembolsosDoneFiltered = this.reembolsosDone
    })
  }

  filterList(searchTerm:string){
    if(this.pendientes){
      this.reembolsosPendingFiltered = this.reembolsosPending.filter(function (el) {
        var name:string = el.userName;
        var ref:string = el.accountRef;
        var time:string = el.time;
        return name.toLowerCase().includes(searchTerm.toLowerCase()) || ref.toLowerCase().includes(searchTerm.toLowerCase()) || time.toLowerCase().includes(searchTerm.toLowerCase())
      });
    }else if(!this.pendientes){
      this.reembolsosDoneFiltered = this.reembolsosDone.filter(function (el) {
        var name:string = el.userName;
        var ref:string = el.accountRef;
        var time:string = el.time;
        return name.toLowerCase().includes(searchTerm.toLowerCase()) || ref.toLowerCase().includes(searchTerm.toLowerCase()) || time.toLowerCase().includes(searchTerm.toLowerCase())
      });
    }
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
