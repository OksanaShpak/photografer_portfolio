import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ɵSWITCH_COMPILE_COMPONENT__POST_R3__ } from '@angular/core';
import { Swipe } from './../../../../../utils/ts/listeners';

@Component({
  selector: 'app-motorcycle-slider',
  templateUrl: './motorcycle-slider.component.html',
  styleUrls: ['./motorcycle-slider.component.scss']
})
export class MotorcycleSliderComponent implements OnInit, AfterViewInit {

  slides: Array<any>;

  isPopUpInView: boolean;
  isSwiping: boolean;
  isInDrag: boolean;

  // for UI logic
  activeSlideId: number;
  previousSlideId: number;
  nextSlideId: number;

  imagesDOM: Array<HTMLElement>;
  titlesDOM: Array<HTMLElement>;
  subtitlesDOM: Array<HTMLElement>;

  slidersSpacing: number;

  @ViewChild('slider', { static: true }) slider: any;
  @ViewChild('dragCTA', { static: true }) dragCTA: any;
  @ViewChild('header', { static: true }) header: any;
  @ViewChild('footer', { static: true }) footer: any;
  @ViewChild('swipeArea', { static: true }) swipeArea: any;


  constructor(
    private el: ElementRef
  ) {
    this.slides = [
      {
        imagePath: './assets/images/works/slider/harley-davidson.jpg',
        title: 'Harley Davidson',
        subtitle: 'advertising',
        backgroundColor: '#36353D'
     },
     {
      imagePath: './assets/images/works/slider/herschel.jpg',
      title: 'Herschel',
      subtitle: 'product design',
      backgroundColor: '#313E47'
     },
     {
     imagePath: './assets/images/works/slider/louis-vuitton.jpg',
      title: 'Louis Vuitton',
      subtitle: 'marketing strategy',
      backgroundColor: '#DEDAE9'
     },
     {
      imagePath: './assets/images/works/slider/tesla.jpg',
       title: 'Tesla',
       subtitle: 'web development',
       backgroundColor: '#494F5D',
      },
      {
       imagePath: './assets/images/works/slider/samsung.jpg',
       title: 'Samsung',
       subtitle: 'strategic planning',
       backgroundColor: '#143B4A',
      }
    ];
    
    document.documentElement.classList.add('no-scroll');
    this.isPopUpInView = false;
    this.isSwiping = true; // hack for disable trasition
    this.activeSlideId = 0;
    this.setNeighbors();
    this.el.nativeElement.style.setProperty('--bg-color', `${this.slides[this.activeSlideId].backgroundColor}`);
    // document.documentElement.classList.remove('no-scroll');
    // document.documentElement.classList.contains('no-scroll');
    // document.documentElement.classList.toggle('no-scroll');
    // document.documentElement.classList.item;
    // document.documentElement.setAttribute('class', 'test1');
    // // document.documentElement.removeAttribute('class');
    // console.log(document.documentElement.getAttribute('class'));
    // document.documentElement.classList.add('no-scroll');
    //
    // document.documentElement.style.backgroundColor = 'red';
    //
    // methods calling to DOM of html comonent
    //
    // console.log(this.el);
    // setTimeout(() => {
    //   console.log(this.slider);
    // }, 3000);

    




    // let array1 = ['word', 'word'];
    // let array1 = new Array(2).fill('word');
    // let array2 = new Array(5).fill('dog');
    // console.log(array1, array2);
    // array1 = [...array1, ...array2];
    // console.log(array1, array2);
    // array2.push('cat');
    // console.log(array1, array2);



  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const swipe = new Swipe(this.swipeArea.nativeElement);
    console.log (this.swipeArea.nativeElement);
    swipe.onToucheStart(() => { this.swipeStart(); });
    swipe.onDiff(() => { this.swiping(swipe); });
    swipe.onToucheEnd(() => { this.swipeEnd(swipe); });
    swipe.run();
    // need to rewrite after slides content updated for component with dynamic content 
    this.imagesDOM = this.slider.nativeElement.querySelectorAll('img');
    this.titlesDOM = this.slider.nativeElement.querySelectorAll('h2');
    this.subtitlesDOM = this.slider.nativeElement.querySelectorAll('p');
    this.checkSlidersSpacing();
    
    this.imagesDOM[this.activeSlideId].style.transform = `translateY(0px)`;
    this.imagesDOM[this.nextSlideId].style.transform = `translateY(calc(100% + ${this.slidersSpacing}px))`;
    this.imagesDOM[this.previousSlideId].style.transform = `translateY(calc(-100% - ${this.slidersSpacing}px))`;
    this.isSwiping = false; // hack for enable trasition
  }

  checkSlidersSpacing() {
    if (this.header.nativeElement.getBoundingClientRect().height > this.footer.nativeElement.getBoundingClientRect().height) {
      this.slidersSpacing = this.header.nativeElement.getBoundingClientRect().height + window.innerHeight * .05;
    } else {
      this.slidersSpacing = this.footer.nativeElement.getBoundingClientRect().height + window.innerHeight * .05;
    }
  }

  swipeStart() {
    console.log('onToucheStart');
    this.isInDrag = true;
    this.checkSlidersSpacing();
    this.setNeighbors();
  }

  swiping(swipe: Swipe) {
    this.isSwiping = true;
    this.setTransformStyles(swipe.yDiff * -1, 'vertical', this.imagesDOM);
    if (Math.abs(swipe.yDiff) <= this.slidersSpacing ) {
      this.setTransformStyles(swipe.yDiff * 0.5, 'vertical', this.dragCTA.nativeElement);
    }
    this.setTransformStyles(swipe.yDiff, 'vertical-by-per', this.titlesDOM);
  }

  swipeEnd(swipe: Swipe) {
    console.log('onToucheEnd', swipe);
    this.isInDrag = false;
    const shift = swipe.yDiff;
    if (this.slides.length > 1) {
      this.isSwiping = false;
      if (Math.abs(shift) > window.innerHeight * .2) {
        if (shift < 0) {
          this.activeSlideId === 0 ? this.activeSlideId = this.slides.length - 1 : this.activeSlideId -= 1;
        } else {
          this.activeSlideId === this.slides.length - 1 ? this.activeSlideId = 0 : this.activeSlideId += 1;
        }
        this.setNeighbors();
      } 
    }
    this.imagesDOM[this.activeSlideId].style.transform = `translateY(0px)`;
    this.imagesDOM[this.nextSlideId].style.transform = `translateY(calc(100% + ${this.slidersSpacing}px))`;
    this.imagesDOM[this.previousSlideId].style.transform = `translateY(calc(-100% - ${this.slidersSpacing}px))`;
    this.dragCTA.nativeElement.style.transform = `translateY(0px)`;
    this.titlesDOM[this.activeSlideId].style.transform = `translateY(0%)`;
  }

  
  // swipeEnd2(config) {
  //   if (this.content.length > 1) {
  //     // if (this.timer) clearTimeout(this.timer);
  //     // const shift = config.xDiff * -1;
  //     // const colission = this.swipeSpeed < 15 ? .1 : .4;
  //     // this.isSwiping = false;
  //     // this.isNewState = false;
  //     if (Math.abs(shift) > this.mediaWrapperDOM.nativeElement.getBoundingClientRect().width * colission) {
  //       // this.isNewState = true;
  //       // this.isTipInView = false;
  //       if (shift < 0) {
  //         this.activeMediaId === this.content.length - 1 ? this.activeMediaId = 0 : this.activeMediaId += 1;
  //       } else {
  //         this.activeMediaId === 0 ? this.activeMediaId = this.content.length - 1 : this.activeMediaId -= 1;
  //       }
  //       this.setNeighbors();
  //     }
  //     // console.log(this.content[this.activeMediaId]);
  //     this.contentDOM[this.activeMediaId].style.transform = `translateX(0px)`;
  //     this.contentDOM[this.nextSlideId].style.transform = `translateX(calc(100% + 20px))`;
  //     this.contentDOM[this.previousSlideId].style.transform = `translateX(calc(-100% - 20px))`;
  //   }
  // }

  setNeighbors() {
    this.previousSlideId = this.activeSlideId === 0 ? this.slides.length - 1 : this.activeSlideId - 1;
    this.nextSlideId = this.activeSlideId === this.slides.length - 1 ? 0 : this.activeSlideId + 1;
  }

  setTransformStyles(shift: number, type: string, DOMElement: any) {
    console.log(shift, type);
    if (type === 'vertical') {
      if (DOMElement.length) {
        DOMElement[this.activeSlideId].style.transform = `translateY(${shift}px)`;
        if (shift < 0 ) {
          DOMElement[this.nextSlideId].style.transform = `translateY(calc(100% + ${this.slidersSpacing}px + ${shift}px))`;
        } else {
          DOMElement[this.previousSlideId].style.transform = `translateY(calc(-100% - ${this.slidersSpacing}px + ${shift}px))`;
        }
      } else {
        DOMElement.style.transform = `translateY(${shift}px)`;
      }
    }
    if (type === 'vertical-by-per') {
      const percents = this.swipeArea.nativeElement.getBoundingClientRect().height / shift;
      DOMElement[this.activeSlideId].style.transform = `translateY(${percents}%)`;
    }
  }

  popUpToggle(){
    this.isPopUpInView = !this.isPopUpInView;
  }
}



