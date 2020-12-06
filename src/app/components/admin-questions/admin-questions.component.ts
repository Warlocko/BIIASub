import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreAdminService } from 'src/app/services/firestore-admin.service';

@Component({
  selector: 'app-admin-questions',
  templateUrl: './admin-questions.component.html',
  styleUrls: ['./admin-questions.component.scss']
})
export class AdminQuestionsComponent implements OnInit {
  questionList
  questionFiltered

  showAddQuestion:boolean = false;
  showEditQuestion:boolean = false;

  editId:string;
  questionName:string;
  questionDescription:string;

  constructor(private afs : FirestoreAdminService, private firestore : AngularFirestore) { }

  ngOnInit(): void {
    this.afs.getQuestions().subscribe(res => {
      this.questionList = res
      this.questionFiltered = res
    })
  }

  toggleAddQuestion(){
    this.showAddQuestion = !this.showAddQuestion
  }

  toggleEditQuestion(id,name,description){
    this.editId = id;
    this.questionName = name;
    this.questionDescription = description;
    this.showEditQuestion = !this.showEditQuestion
  }

  createQuestion(name,description){
    this.afs.addQuestion(name,description)
    this.showAddQuestion = !this.showAddQuestion
  }

  editQuestion(name,description){
    this.afs.editQuestion(this.editId,name,description)
    this.showEditQuestion = !this.showEditQuestion
  }

  removeQuestion(){
    this.afs.removeQuestion(this.editId)
    this.showEditQuestion = !this.showEditQuestion
  }

  filterList(searchTerm:string){
    this.questionFiltered = this.questionList.filter(function (el) {
        var name:string = el.name;
        var description: string = el.description
        return name.toLowerCase().includes(searchTerm.toLowerCase()) || description.toLowerCase().includes(searchTerm.toLowerCase())
    });
  }

}
