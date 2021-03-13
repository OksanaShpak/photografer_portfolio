import { Content } from '@angular/compiler/src/render3/r3_ast';
import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { ScrollServiceService } from 'src/app/services/scroll-service/scroll-service.service';

@Component({
  selector: 'app-photografer-page',
  templateUrl: './photografer-page.component.html',
  styleUrls: ['./photografer-page.component.scss']
})
export class PhotograferPageComponent implements OnInit, AfterViewInit, OnDestroy {

  // for scroll animation
  scrollAnimationFunction: any;
  scrollWrapperDOM: any;

  scrollAnimationSize: number;

  // for smoothscroll
  @ViewChild('portfolio', { static: true }) portfolio: any;
  @ViewChild('about', { static: true }) about: any;
  @ViewChild('contact', { static: true }) contact: any;
  @ViewChild('header', { static: true }) header: any;


  constructor(
    private scrollService: ScrollServiceService,
    // for smoothscroll
    private el: ElementRef
  ) {
    this.scrollAnimationSize = this.scrollService.scrollAnimationSize;
  }

  ngOnInit(): void {
    document.documentElement.classList.add('no-scroll');
  }
  ngAfterViewInit(): void {
    this.scrollWrapperDOM = document.querySelector('app-photografer-page');
    const neededDOM = document.querySelectorAll('.y-axis');
    this.scrollAnimationFunction = (e) => {
      neededDOM.forEach(element => {
        if (
          !element.classList.contains('enter')
          && element.getBoundingClientRect().top - window.innerHeight < this.scrollAnimationSize
          && element.getBoundingClientRect().bottom > this.scrollAnimationSize
        ) {
          element.classList.add('enter');
        } else if (
          element.classList.contains('enter')
          &&
          !element.classList.contains('once')
          &&
          (
            (element.getBoundingClientRect().top - window.innerHeight > this.scrollAnimationSize
            && element.getBoundingClientRect().bottom > this.scrollAnimationSize)
          ||
            (element.getBoundingClientRect().top - window.innerHeight < this.scrollAnimationSize
            && element.getBoundingClientRect().bottom < this.scrollAnimationSize)
          )
        ) {
          element.classList.remove('enter');
        }
      });
    };
    this.scrollWrapperDOM.addEventListener('scroll', this.scrollAnimationFunction);

  }



  scrollToSection(index = null) {
    switch (index) {
      case 1:
        this.el.nativeElement.scrollTo({
          top: this.portfolio.nativeElement.getBoundingClientRect().y + this.el.nativeElement.scrollTop - this.header.nativeElement.getBoundingClientRect().height,
          behavior: 'smooth'
        });
        break;
      case 2:
        this.el.nativeElement.scrollTo({
          top: this.about.nativeElement.getBoundingClientRect().y + this.el.nativeElement.scrollTop - this.header.nativeElement.getBoundingClientRect().height,
          behavior: 'smooth'
        });
        break;
      case 3:
        this.el.nativeElement.scrollTo({
          top: this.contact.nativeElement.getBoundingClientRect().y + this.el.nativeElement.scrollTop - this.header.nativeElement.getBoundingClientRect().height,
          behavior: 'smooth'
        });
        break;
      default:
        this.el.nativeElement.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        break;
    }
  }


  ngOnDestroy(): void {
    this.scrollWrapperDOM.removeEventListener('scroll', this.scrollAnimationFunction);
    document.documentElement.classList.remove('no-scroll');
  }


}
