import { Component, OnInit } from '@angular/core';
import { FirestoreAdminService } from 'src/app/services/firestore-admin.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questionList
  questionFiltered

  constructor(private afs : FirestoreAdminService) { }

  ngOnInit(): void {
    this.afs.getQuestions().subscribe(res => {
      this.questionList = res
      this.questionFiltered = res
    })
  }

  toggleQuestionOpen(clicked){
    document.getElementById(clicked).classList.toggle('open');
  }

  searchFAQ(searchTerm:string){
    this.questionFiltered = this.questionList.filter(function (el) {
        var name:string = el.name
        var description:string = el.description
        return name.toLowerCase().includes(searchTerm.toLowerCase()) || description.toLowerCase().includes(searchTerm.toLowerCase())
    });
  }

}
