import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollServiceService {

  scrollAnimationSize: number;

  constructor() {
    this.scrollAnimationSize = 40;
    // document.body.style.setProperty('--scroll-animation-size', this.scrollAnimationSize + "px ");
    document.body.style.setProperty('--scroll-animation-size', `${this.scrollAnimationSize}px`);
  }
}
