import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreAdminService } from 'src/app/services/firestore-admin.service';

@Component({
  selector: 'app-academias',
  templateUrl: './academias.component.html',
  styleUrls: ['./academias.component.scss']
})
export class AcademiasComponent implements OnInit {
  academiaList
  showAcademiaInfo = false
  academiaName
  academiaDescription
  academiaPath
  academiaDiscount
  planList
  editId

  constructor(private afs : FirestoreAdminService, private firestore : AngularFirestore) { }

  ngOnInit(): void {
    this.afs.getAcademias().subscribe(res => {
      this.academiaList = res
    })
  }

  toggleAcademiaInfo(name,description,discount,path,id){
    this.academiaName = name
    this.academiaDescription = description
    this.academiaDiscount = discount
    this.academiaPath = path
    this.editId = id
    console.log(id)
    this.firestore.collection('academias').doc(id).collection('planes').valueChanges().subscribe(res =>{
      this.planList = res
    })
    this.showAcademiaInfo = !this.showAcademiaInfo
  }

}
