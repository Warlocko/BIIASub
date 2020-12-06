import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface broker{
  id?: string,
  name: string,
  email: string,
  brokerID: string,
  page: string,
  description: string,
  path: string
}

export interface academia{
  id?: string,
  name: string,
  discount: number,
  description: string,
  path: string
}

export interface question{
  id?: string,
  name: string,
  description: string
}

export interface plan{
  name: string,
  buy_link: string,
  price: number,
  discount: number,
  telegram: string,
  success: string,
  bullets
}

export interface account{
  accountID: string,
  balance: number,
  brokerName: string,
  brokerPath: string,
  isActive: boolean,
  userName: string,
  creationTime
}

export interface pago{
  userRef: string,
  userBalancePrev: number,
  userBalanceNew: number,
  user: string,
  time
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreAdminService {
  private brokerList: Observable<broker[]>
  private brokerCollection: AngularFirestoreCollection<broker>

  private academiaList: Observable<academia[]>
  private academiaCollection: AngularFirestoreCollection<academia>

  private questionList: Observable<question[]>
  private questionCollection: AngularFirestoreCollection<question>

  private planList: Observable<plan[]>
  private planCollection: AngularFirestoreCollection<plan>

  private accountList: Observable<account[]>
  private accountCollection: AngularFirestoreCollection<account>

  private pagosList: Observable<pago[]>
  private pagosCollection: AngularFirestoreCollection<pago>

  academia_id = ""

  constructor(private firestore: AngularFirestore) {
    this.brokerCollection = this.firestore.collection<broker>('brokers');
    this.brokerList = this.brokerCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.academiaCollection = this.firestore.collection<academia>('academias');
    this.academiaList = this.academiaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.questionCollection = this.firestore.collection<question>('preguntas');
    this.questionList = this.questionCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.accountCollection = this.firestore.collection<account>('accounts');
    this.accountList = this.accountCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    this.pagosCollection = this.firestore.collection<pago>('pagos');
    this.pagosList = this.pagosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
   }


  createUserRecord(data) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("users")
            .doc(data.id)
            .set({
              name: data.name,
              email: data.email,
              role: 'user',
              gDisp: 0,
              gPen: 0,
              gTot: 0,
              hasPaypal: false,
              paypal: ""
            }).then(res => {resolve(res)}, err => reject(err));
    });
  }

  getUserRecord(id) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("users")
            .doc(id)
            .ref
            .get()
            .then(res => {resolve(res.data())}, err => reject(err));
    });
  }

  
  getBrokers(){
    return this.brokerList
  }

  removeBroker(id){
    return new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("brokers")
          .doc(id)
          .delete().then(res => {resolve(res)}, err => reject(err));
    });
  }

  getAcademias(){
    return this.academiaList
  }

  removeAcademia(id){
    return new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("academias")
          .doc(id)
          .delete().then(res => {resolve(res)}, err => reject(err));
    });
  }

  createPlan(academia_ID, name, buy_link, price, discount, telegram_link, success, bullets){
    return new Promise<any>((resolve, reject) =>{
      this.firestore.collection("academias").doc(academia_ID).collection('planes').add({
            name: name,
            buy_link: buy_link,
            price: price,
            discount: discount,
            telegram: telegram_link,
            success: success,
            bullets: bullets,
          }).then(res => {resolve(res)}, err => reject(err));
    });
    
  }

  getPlanes(id){
    this.academia_id = id
    return this.planList
  }

  updatePlan(academia_ID, plan_ID, name, buy_link, price, discount, telegram, success, bullets){
    return new Promise<any>((resolve, reject) =>{
      this.firestore.collection("academias").doc(academia_ID).collection('planes').doc(plan_ID).set({
            name: name,
            buy_link: buy_link,
            price: price,
            discount: discount,
            telegram: telegram,
            success: success,
            bullets: bullets
          }).then(res => {resolve(res)}, err => reject(err));
    });
  }

  removePlan(academia_id,id){
    return new Promise<any>((resolve, reject) =>{
    this.firestore.collection('academias').doc(academia_id).collection('planes').doc(id).delete().then(res => {resolve(res)}, err => reject(err));
    });
  }

  addQuestion(name, description){
    return new Promise<any>((resolve, reject) =>{
      this.firestore.collection("preguntas").add({
            name: name,
            description: description
          }).then(res => {resolve(res)}, err => reject(err));
    });
  }

  editQuestion(id, name, description){
    return new Promise<any>((resolve, reject) =>{
      this.firestore.collection("preguntas").doc(id).set({
            name: name,
            description: description
          }).then(res => {resolve(res)}, err => reject(err));
    });
  }
  
  getQuestions(){
    return this.questionList
  }

  removeQuestion(id){
    return new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("preguntas")
          .doc(id)
          .delete().then(res => {resolve(res)}, err => reject(err));
    });
  }

  getAccounts(){
    return this.accountList
  }

  getAccountsFiltered(id){
    var accountCollection = this.firestore.collection<any>('accounts', ref => ref.where('userID','==',id));
    var accountList = accountCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
    return accountList
  }

  getReembolsosFiltered(id){
    var reembolsoCollection = this.firestore.collection<any>('reembolsos', ref => ref.where('userID','==',id));
    var reembolsoPending = this.firestore.collection<any>('reembolsos', ref => ref.where('pending','==',true));
    var reembolsoList = reembolsoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
    var reembolsoPendingList = reembolsoPending.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
    //reembolsoList.filter(value => reembolsoPendingList.includes(value))
    return reembolsoList
  }

  getReembolsosPending(){
    var reembolsoCollection = this.firestore.collection<any>('reembolsos', ref => ref.where('pending','==',true));
    var reembolsoList = reembolsoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
    return reembolsoList
  }

  getReembolsosDone(){
    var reembolsoCollection = this.firestore.collection<any>('reembolsos', ref => ref.where('pending','==',false));
    var reembolsoList = reembolsoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
    return reembolsoList
  }

  checkReembolso(id){
    var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      var time = today.getHours() + ':' + String(today.getMinutes()).padStart(2, '0')

      var date = dd + '/' + mm + '/' + yyyy + " a las "+ time
    this.firestore.collection('reembolsos').doc(id).update({pending:false,closeTime:date})
  }

  getPagosFiltered(id){
    var pagoCollection = this.firestore.collection<any>('pagos', ref => ref.where('userID','==',id));
    var pagoList = pagoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
    return pagoList
  }

  activateAccount(id){
    this.firestore.collection('accounts').doc(id).update({isActive: true})
  }

  changeBalance(id,value){
    this.firestore.collection('accounts').doc(id).update({balance: value})
  }

  createPago(user,userID,userRef,userBalancePrev,userBalanceNew){
    return new Promise<any>((resolve, reject) =>{
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      var time = today.getHours() + ':' + String(today.getMinutes()).padStart(2, '0')

      var date = dd + '/' + mm + '/' + yyyy + " a las "+ time
      this.firestore.collection("pagos").add({
            user: user,
            userID: userID,
            userRef: userRef,
            userBalancePrev: userBalancePrev,
            userBalanceNew: userBalanceNew,
            time: date
          }).then(res => {resolve(res)}, err => reject(err));
    });
  }

  getPagos(){
    return this.pagosList
  }

}
