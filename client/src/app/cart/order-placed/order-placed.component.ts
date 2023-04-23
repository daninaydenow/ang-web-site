import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.css'],
})
export class OrderPlacedComponent implements OnInit {
  orderNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
  constructor() {}

  ngOnInit(): void {}
}
