import { Component, OnInit } from '@angular/core';
import { FirestoreAdminService } from 'src/app/services/firestore-admin.service';

@Component({
  selector: 'app-admin-cuentas',
  templateUrl: './admin-cuentas.component.html',
  styleUrls: ['./admin-cuentas.component.scss']
})
export class AdminCuentasComponent implements OnInit {
  accountsList
  pagosList
  showBalanceModal
  accountID
  accountBalance
  accountName
  accountRef
  userID
  showPagos = false

  constructor(private afs : FirestoreAdminService) { }

  ngOnInit(): void {
    this.afs.getAccounts().subscribe(res => {
      this.accountsList = res
    })
    this.afs.getPagos().subscribe(res => {
      console.log(res)
      this.pagosList = res.sort( this.compare );
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

  activateAccount(id){
    this.afs.activateAccount(id)
  }

  toggleEditModal(accountID,userID,accountBalance,accountName,accountRef){
    this.accountID = accountID
    this.accountBalance = accountBalance
    this.accountName = accountName
    this.accountRef = accountRef
    this.userID = userID
    this.showBalanceModal = !this.showBalanceModal;
  }

  saveBalance(id,accountBalance){
    this.afs.changeBalance(id,accountBalance)
    this.afs.createPago(this.accountName,this.userID,this.accountRef,this.accountBalance,accountBalance)
    this.showBalanceModal = !this.showBalanceModal;
  }

  togglePagos(element){
    if(element=='cuentas'){
      this.showPagos = false
    }else{
      this.showPagos = true
    }
    document.getElementsByClassName('chosen-tab')[0].classList.remove('chosen-tab')
    document.getElementById(element).classList.add('chosen-tab')
  }

}
