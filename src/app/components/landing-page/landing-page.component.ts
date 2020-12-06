import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hasAppearedNavbar(){
    document.getElementsByClassName('navbar')[0].classList.add('appearedNavbar')
  }

  hasAppearedGuacamaya(){
    document.getElementsByClassName('animal-text-container')[0].classList.add('appearedText')
    document.getElementById('guacamayaImg').classList.add('appearedImg')
  }

  hasAppearedTortuga(){
    document.getElementById('tortugaText').classList.add('appearedTextLeft')
    document.getElementById('tortugaImg').classList.add('appearedImgRight')
  }

  hasAppearedJaguar(){
    console.log('appeared')
    document.getElementsByClassName('animal-text-container')[1].classList.add('appearedText')
    document.getElementById('jaguarImg').classList.add('appearedImg')
  }

}
