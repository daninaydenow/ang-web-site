import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  user!: User;
  userName: string | undefined = '';
  movies: any = [];
  subscribtion!: Subscription;
  constructor(private authService: AuthenticationService) {
    this.subscribtion = this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.userName = this.user?.email?.split('@')[0];
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
