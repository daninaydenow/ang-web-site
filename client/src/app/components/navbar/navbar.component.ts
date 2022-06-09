import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: string | null;
  constructor() {
    this.user = localStorage.getItem('user');
  }

  ngOnInit(): void {
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
  }
}
