import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { FirestoreAdminService } from 'src/app/services/firestore-admin.service';
import { Upload } from 'src/app/services/upload';
import { UploadService } from 'src/app/services/upload.service';

export interface plan{
  name: string,
  buy_link: string,
  price: number,
  discount: number,
  telegram: string,
  success: string,
  bullets
}

@Component({
  selector: 'app-admin-academias',
  templateUrl: './admin-academias.component.html',
  styleUrls: ['./admin-academias.component.scss']
})
export class AdminAcademiasComponent implements OnInit {
  public academiaList;

  public planList: Observable<plan[]>;
  private planCollection: AngularFirestoreCollection<plan>

  public planes

  currentUpload: Upload;
  showCreateAcademia:boolean = false;
  showEditAcademia:boolean = false;
  showAddPlan:boolean = false;
  showEditPlan:boolean = false;
  confirmation:string = ''
  editId:string;
  academiaName:string;
  academiaDiscount:number;
  academiaDescription:string;
  academiaPlansNumber:string;
  academiaPath:string;

  plan_id: string
  plan_name: string
  plan_buy_link: string
  plan_price: number
  plan_discount: number
  plan_telegram: string
  plan_success: string
  plan_bullets

  plans$: Observable<any>

  constructor(private upSvc: UploadService, private afs : FirestoreAdminService, private firestore : AngularFirestore) { }

  ngOnInit(): void {
    this.afs.getAcademias().subscribe(res => {
        this.academiaList = res
      }
    )
  }

  toggleForm(){
    this.showCreateAcademia = !this.showCreateAcademia
    this.currentUpload = null
    this.confirmation = ""
  }

  handleDrop(fileList){
    this.currentUpload = new Upload(fileList.dataTransfer.files[0])
    this.confirmation = "Imagen Subida"
  }

  uploadAcademia(name,discount:number,description){
    if(this.currentUpload){
      this.upSvc.createAcademia(this.currentUpload,name,discount,description)
      this.showCreateAcademia = !this.showCreateAcademia
    }else{
      this.confirmation="Por favor inserta una imagen para la academia"
    }
  }

  //Método para mostrar formulario para editar academias y asignar los valores actuales de la academia
  toggleEditAcademia(id,name,discount,description,path,planNumber){
    this.editId = id;
    this.academiaName = name;
    this.academiaDiscount = discount
    this.academiaDescription = description;
    this.academiaPath = path;
    this.academiaPlansNumber = planNumber;
    this.currentUpload=null
    this.planCollection = this.firestore.collection('academias').doc(this.editId).collection<plan>('planes');
    this.planList = this.planCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
    this.planList.subscribe(res => {
      this.planes = res
    })
    this.showEditAcademia = !this.showEditAcademia;
    this.confirmation = ""
  }

  //Método para mostrar formulario para editar planes y asignar los valores actuales del plan
  toggleEditPlan(planID,planName,buy_link,price,discount,telegram_link,success,bullets){
    console.log(planID)
    this.plan_id = planID
    this.plan_name = planName
    this.plan_buy_link = buy_link
    this.plan_price = price
    this.plan_discount = discount
    this.plan_telegram = telegram_link
    this.plan_success = success
    if(bullets != null){
      this.plan_bullets = bullets.join("\n")
    }
    this.showEditPlan = !this.showEditPlan
  }

  //Guardar cambios a una academia
  editAcademia(name,discount:number,description,path){
    this.upSvc.editAcademia(this.currentUpload,name,discount,description,this.editId,path,this.academiaPlansNumber)
    this.showEditAcademia = !this.showEditAcademia
  }

  //Eliminar academia
  removeAcademia(){
    var academiaID = this.editId
    this.toggleEditAcademia(null,null,null,null,null,null)
    this.afs.removeAcademia(academiaID)
  }

  togglePlanForm(){
    this.showAddPlan = !this.showAddPlan
  }

  createPlan(academia_ID, name, buy_link, price, discount, telegram_link, success, bullets){
    var bulletsSplit = bullets.split("\n")
    this.afs.createPlan(academia_ID, name, buy_link, price, discount, telegram_link, success, bulletsSplit)
    this.firestore.firestore.collection('academias').doc(academia_ID).collection('planes').get().then(snap =>{
      this.firestore.collection('academias').doc(academia_ID).update({planNumber: snap.size})
    })
    this.showAddPlan = !this.showAddPlan
  }

  updatePlan(name, buy_link, price, discount, telegram, success, bullets){
    var bulletsSplit = bullets.split("\n")
    this.afs.updatePlan(this.editId, this.plan_id, name, buy_link, price, discount, telegram, success, bulletsSplit)
    this.showEditPlan = !this.showEditPlan
  }

  removePlan(academia_ID,id){
    this.afs.removePlan(academia_ID,id);
    this.firestore.firestore.collection('academias').doc(academia_ID).collection('planes').get().then(snap =>{
      this.firestore.collection('academias').doc(academia_ID).update({planNumber: snap.size})
    })
    this.showEditPlan = !this.showEditPlan
  }


}
