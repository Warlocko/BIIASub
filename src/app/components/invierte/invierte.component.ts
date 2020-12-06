import { Component, OnInit } from '@angular/core';
import { FirestoreAdminService } from 'src/app/services/firestore-admin.service';

@Component({
  selector: 'app-invierte',
  templateUrl: './invierte.component.html',
  styleUrls: ['./invierte.component.scss']
})
export class InvierteComponent implements OnInit {
  brokerList

  constructor(private afs : FirestoreAdminService) { }

  ngOnInit(): void {
    this.afs.getBrokers().subscribe(res => {
      this.brokerList = res
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
