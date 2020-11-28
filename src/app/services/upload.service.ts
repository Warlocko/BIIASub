import { Injectable } from '@angular/core';
import { Upload } from './upload'
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database'
import * as firebase from 'firebase'
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private db: AngularFirestore) {

  }

  createBroker(upload: Upload,name,id,page,mail,description){
    let storageRef = firebase.default.storage().ref()
    let uploadTask = storageRef.child(`uploads/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.default.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>{
        upload.progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
      },
      (error) => {
        console.log(error)
      },
      ()=>{
         uploadTask.snapshot.ref.getDownloadURL().then(url =>{
          upload.url = url
          upload.name = upload.file.name
          this.createFileDataBroker(name,id,page,mail,description,url)
          })
      })
  }

  private createFileDataBroker(name,id,page,mail,description,path){
    return new Promise<any>((resolve, reject) =>{
      this.db.collection("brokers").add({
            name: name,
            brokerID: id,
            page: page,
            email: mail,
            description: description,
            path: path
          }).then(res => {resolve(res)}, err => reject(err));
    });
  }

  editBroker(upload: Upload,name,brokerRef,page,mail,description,id,path){
    if(upload){
      let storageRef = firebase.default.storage().ref()
    let uploadTask = storageRef.child(`brokers/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.default.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>{
        upload.progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
      },
      (error) => {
        console.log(error)
      },
      ()=>{
         uploadTask.snapshot.ref.getDownloadURL().then(url =>{
          upload.url = url
          upload.name = upload.file.name
          this.editFileDataBroker(id,name,brokerRef,page,mail,description,upload.url)
          })
      })
    }else{
      this.editFileDataBroker(id,name,brokerRef,page,mail,description,path)
    }
  }

  private editFileDataBroker(id,name,brokerRef,page,mail,description,path){
    return new Promise<any>((resolve, reject) =>{
      this.db.collection("brokers").doc(id).set({
            name: name,
            brokerID: brokerRef,
            page: page,
            email: mail,
            description: description,
            path: path
          }).then(res => {resolve(res)}, err => reject(err));
    });
  }

  createAcademia(upload: Upload,name,discount,description){
    let storageRef = firebase.default.storage().ref()
    let uploadTask = storageRef.child(`academias/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.default.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>{
        upload.progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
      },
      (error) => {
        console.log(error)
      },
      ()=>{
         uploadTask.snapshot.ref.getDownloadURL().then(url =>{
          upload.url = url
          upload.name = upload.file.name
          this.createFileDataAcademia(name,discount,description,url)
          })
      })
  }

  private createFileDataAcademia(name,discount,description,path){
    return new Promise<any>((resolve, reject) =>{
      this.db.collection("academias").add({
            name: name,
            discount: discount,
            description: description,
            planNumber: 0,
            path: path
          }).then(res => {resolve(res)}, err => reject(err));
    });
  }

  editAcademia(upload: Upload,name,discount,description,id,path,planNumber){
    if(upload){
      let storageRef = firebase.default.storage().ref()
    let uploadTask = storageRef.child(`brokers/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.default.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>{
        upload.progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
      },
      (error) => {
        console.log(error)
      },
      ()=>{
         uploadTask.snapshot.ref.getDownloadURL().then(url =>{
          upload.url = url
          upload.name = upload.file.name
          this.editFileDataAcademia(id,name,discount,description,upload.url,planNumber)
          })
      })
    }else{
      this.editFileDataAcademia(id,name,discount,description,path,planNumber)
    }
  }

  private editFileDataAcademia(id,name,discount,description,path,planNumber){
    return new Promise<any>((resolve, reject) =>{
      this.db.collection("academias").doc(id).set({
            name: name,
            discount: discount,
            description: description,
            path: path,
            planNumber: planNumber
          }).then(res => {resolve(res)}, err => reject(err));
    });
  }

}
