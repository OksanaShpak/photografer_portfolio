import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pr-input',
  templateUrl: './pr-input.component.html',
  styleUrls: ['./pr-input.component.scss']
})
export class PrInputComponent implements OnInit {

  @Input() title: string;
  @Input() type: string;
  @Input() value: string;
  @Input() placeholder: string;

  @Output() valueChanged = new EventEmitter<string>();

  isError: boolean;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, 'ngOnChanges');
  }

  ngOnInit(): void {
  }

  inputOnChange(event) {
    if (this.type === 'email' && this.validateEmail(event.target.value)) {
      // this.value = event.target.value;
      this.valueChanged.emit(event.target.value);
    } else {
      console.log('valid error');
    }
  }

  validateEmail(email: string) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    this.isError = !re.test(email);
    return re.test(email);
  }
}
