import { Component, OnInit } from '@angular/core';
import { FirestoreAdminService } from 'src/app/services/firestore-admin.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questionList

  constructor(private afs : FirestoreAdminService) { }

  ngOnInit(): void {
    this.afs.getQuestions().subscribe(res => {
      this.questionList = res
    })
  }

  toggleQuestionOpen(clicked){
    document.getElementById(clicked).classList.toggle('open');
  }

}
