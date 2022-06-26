import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  user!: User;
  userName: string | undefined = '';
  movies: any = [];
  subscribtion!: Subscription;
  constructor(
    private authService: AuthenticationService,
    private movieService: MovieService
  ) {
    this.subscribtion = this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.userName = this.user?.email?.split('@')[0];
    this.movieService.getAll().subscribe((response) => {
      this.movies.push(response);
    });
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
