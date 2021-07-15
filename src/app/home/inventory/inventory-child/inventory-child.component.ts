import { Component, OnInit ,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inventory-child',
  templateUrl: './inventory-child.component.html',
  styleUrls: ['./inventory-child.component.css']
})
export class InventoryChildComponent implements OnInit {
  @Input() parentCount:number;
  @Output() valueChange = new EventEmitter();
  counter = 0;

  constructor() { }

  ngOnInit(): void {
  }
 valueChanged(){
    this.counter += 1;
    this.valueChange.emit(this.counter);
  }
}
