import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service'
import { FirestoreAdminService } from '../../services/firestore-admin.service'
import { Upload } from '../../services/upload'
import * as _ from "lodash"
import { Observable } from 'rxjs/internal/Observable';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-brokers',
  templateUrl: './admin-brokers.component.html',
  styleUrls: ['./admin-brokers.component.scss']
})
export class AdminBrokersComponent implements OnInit {
  public brokerList;
  currentUpload: Upload;
  showCreateBroker:boolean = false;
  showEditBroker:boolean = false;
  confirmation:string = ''
  brokerName;
  brokerRef;
  brokerPage;
  brokerMail;
  brokerDescription;
  brokerPath;
  editId;
  

  constructor(private upSvc: UploadService, private afs : FirestoreAdminService) { }

  ngOnInit(): void {
    this.afs.getBrokers().subscribe(res => {
      this.brokerList = res
    })
  }

  handleDrop(fileList){
    this.currentUpload = new Upload(fileList.dataTransfer.files[0])
    this.confirmation = "Imagen Subida"
  }

  toggleForm(){
    this.showCreateBroker = !this.showCreateBroker
    this.currentUpload = null
    this.confirmation = ""
  }

  uploadBroker(name,id,page,mail,description){
    if(this.currentUpload){
      this.upSvc.createBroker(this.currentUpload,name,id,page,mail,description)
      this.showCreateBroker = !this.showCreateBroker
    }else{
      this.confirmation="Por favor inserta una imagen para el broker"
    }
  }

  toggleEditBroker(id,name,brokerID,page,mail,description,path){
    this.editId = id;
    this.brokerName = name;
    this.brokerRef = brokerID;
    this.brokerPage = page;
    this.brokerMail = mail;
    this.brokerDescription = description;
    this.brokerPath = path;
    this.currentUpload=null
    this.showEditBroker = !this.showEditBroker;
    this.confirmation = ""
  }

  editBroker(name,brokerID,page,mail,description,path){
      this.upSvc.editBroker(this.currentUpload,name,brokerID,page,mail,description,this.editId,path)
      this.showEditBroker = !this.showEditBroker
  }

  removeBroker(){
    this.afs.removeBroker(this.editId)
    this.toggleEditBroker(null,null,null,null,null,null,null)
  }

}
