import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'
import * as firebase from 'firebase';
import { FirestoreAdminService } from 'src/app/services/firestore-admin.service';
import { Observable } from 'rxjs';

export interface account{
  accountID:string,
  balance:number,
  broker:string,
  brokerPath:string,
  isActive:boolean,
  name:string,
  time,
  userID:string,
  id:string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  uid;
  user;
  gDisp:number = 0;
  gPen:number = 0;
  gTot:number = 0;
  noPaypal:boolean;
  accountList: account[];
  reembolsoList
  account;
  showReembolsoModal: boolean = false;
  confirmation

  constructor(public firebaseAuth : AngularFireAuth, private router:Router, private userService: UserService, private afs: FirestoreAdminService) { 
      
    
  }

  ngOnInit(): void {
    this.firebaseAuth.currentUser.then(user =>{
      this.uid = user.uid;
      this.userService.getUserById(this.uid).subscribe(res => {
        this.user = res;
        this.gPen = res.gPen;
        this.noPaypal = !res.hasPaypal;
      })
      this.afs.getAccountsFiltered(user.uid).subscribe((res:account[]) => {
        this.accountList = res
        this.gDisp = this.accountList.map(a => a.balance).reduce(function(a, b)
        {
          return a + b;
        });
        this.gTot = this.gDisp + this.gPen
      })
      this.afs.getReembolsosFiltered(user.uid).subscribe(res => {
        this.reembolsoList = res.sort( this.compare )
        console.log()
        this.gPen = this.reembolsoList.map(a => a.amount).reduce(function(a, b)
        {
          return a + b;
        });
        this.gTot = this.gDisp + this.gPen
      })
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

  createReembolso(accountID,amount){
    var account = this.accountList.filter(x => x.accountID == accountID)[0]
    if(account){
      if(amount<=0){
        this.confirmation = "Ingresa un número mayor a 0 y menor al balance de la cuenta"
      }else if(amount>account.balance){
        this.confirmation = "Ingresa un número menos al balance de la cuenta"
      }else{
        this.userService.createReembolso(accountID,this.uid,account.balance,parseFloat(amount),account.broker,account.brokerPath,account.id,this.user.paypal,this.user.name)
        this.showReembolsoModal = !this.showReembolsoModal
      }
    }else{
      this.confirmation = "No se encontró una cuenta con ese identificador."
    }
    
  }

  toggleReembolsoModal(){
    this.showReembolsoModal = !this.showReembolsoModal
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if(charCode == 46) return true
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
