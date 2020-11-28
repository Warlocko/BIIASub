import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirestoreAdminService } from 'src/app/services/firestore-admin.service';
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
  paypal
  label = "";
  placeholder = "";
  showPaypalModal = false;
  checkboxChecked = false;
  showEditModal = false;
  pagoList

  constructor(public firebaseAuth : AngularFireAuth, private router:Router, private userService: UserService, private afs: FirestoreAdminService) { }

  ngOnInit(): void {
    this.firebaseAuth.currentUser.then(user =>{
      this.uid = user.uid;
      this.userService.getUserById(this.uid).subscribe(res => {
      this.name = res.name;
      this.email = res.email;
      this.paypal = res.paypal;
      })
      this.afs.getPagosFiltered(user.uid).subscribe(res => {
        this.pagoList = res
      })
    })
  }

  toggleEditModal(attribute:string){
    this.label = attribute;
    this.placeholder = "Ingresa tu "+attribute;
    this.showEditModal = !this.showEditModal;
  }

  saveEdit(value:string){
    this.userService.changeName(this.uid,value)
    this.showEditModal = false;
  }

  togglePaypal(){
    this.showPaypalModal = !this.showPaypalModal
  }

  toggleCheckBox(){
    this.checkboxChecked = !this.checkboxChecked
    if(this.checkboxChecked){
      document.getElementById('paypal-checkbox').classList.add('checked')
      document.getElementById('paypal-save').removeAttribute("disabled")
    }else{
      document.getElementById('paypal-checkbox').classList.remove('checked')
      document.getElementById('paypal-save').setAttribute("disabled", "yes")
    }
  }

  savePaypal(account){
    this.userService.savePaypal(this.uid,account);
    this.showPaypalModal = false;
    this.checkboxChecked = false;
  }

  onLogout(){
    this.firebaseAuth.signOut().then(() =>{
        this.router.navigate(['login'])
      }
    )
  }

}
