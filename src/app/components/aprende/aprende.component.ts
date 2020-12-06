import { Component, OnInit } from '@angular/core';
import { FirestoreAdminService } from 'src/app/services/firestore-admin.service';

@Component({
  selector: 'app-aprende',
  templateUrl: './aprende.component.html',
  styleUrls: ['./aprende.component.scss']
})
export class AprendeComponent implements OnInit {
  academiaList

  constructor(private afs : FirestoreAdminService) { }

  ngOnInit(): void {
    this.afs.getAcademias().subscribe(res => {
      this.academiaList = res
      console.log(typeof(this.academiaList))
      console.log(this.academiaList.filter(academia => academia.id == "IulZhN4HnQsiUj9M1DQI"))
    }
  )
  }

  config = {
    direction: 'horizontal',
    slidesPerView: 1,
    slideToClickedSlide: false,
    initialSlide: 0,
    mousewheel: false,
    setWrapperSize: true,
    scrollbar: false,
    watchSlidesProgress: true,
    navigation: true,
    keyboard: true,
    centeredSlides: false,
    loop: false,
    roundLengths: true,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    spaceBetween: 0,
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
        // when window width is >= 320px
        1000: {
            slidesPerView: 3
        }
    }
  }

}
