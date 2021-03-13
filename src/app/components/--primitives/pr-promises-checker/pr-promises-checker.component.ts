import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pr-promises-checker',
  templateUrl: './pr-promises-checker.component.html',
  styleUrls: ['./pr-promises-checker.component.scss']
})
export class PrPromisesCheckerComponent implements OnInit, AfterViewInit {

  promises: any;
  counter = 5;

  constructor() {
    console.log('i\'m constructor');
    this.promises = new Array(); // this is array variable type
    Promise.all(this.promises)
    .then(e => {
      console.log('all is done, we can go to next');
    })
    .catch(error => {
      console.log('some error => ', error);
    });
  }

  ngOnInit(): void {
    console.log('i\'m ngOnInit');
  }

  ngAfterViewInit(): void {
    console.log('i\'m ngAfterViewInit');
    this.runPromisesStuck();
  }

  promiseTestRun(index: number) {
    return new Promise((resolve, reject) => {
        console.log('i\'m next promise =>' + index);
        resolve(true);
    });
  }

  specialPromiseTestRun(value: any) {
    return new Promise((resolve, reject) => {
        console.log('i\'m special! next promise =>' + value);
        if (value instanceof Number) {
          resolve(true);
        } else {
          reject('i\'m not a Number!');
        }
    });
  }

  runPromisesStuck() {
    this.promises.push(this.specialPromiseTestRun('special').catch(error => {
      console.log('some error => ', error);
    }));
    for (let index = 0; index < this.counter; index++) {
      this.promises.push(this.promiseTestRun(index));
    }
  }

  //
  // case 1 with resolveHook var and case 2 with default resolve() using inside on the promise
  //
  // resolveHook: any;
  // promise: any;

  // constructor() { 
  //   console.log('i\'m constructor');
  //   this.promise = new Promise((resolve, reject) => {
  //       this.resolveHook = resolve;
  //       // resolve(true);
  //   });
  // }

  // ngOnInit(): void {
  //   console.log('i\'m ngOnInit');
  //   this.promise.then(e => {
  //     console.log('i\'m resolved');
  //   })
  // }

  // ngAfterViewInit(): void {
  //   console.log('i\'m ngAfterViewInit');
  //   this.resolveHook();
  // }

}
