import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  opened = true;
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.opened = true;
  }
}
