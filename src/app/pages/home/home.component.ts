/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { HeaderComponent } from '../../core/components/header/header.component';
import { MovieCarruselComponent } from '../../shared/components/movie-carrusel/movie-carrusel.component';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { MovieService } from '../../shared/services/movie.service';

interface Sources {
  movies: {results: IVideoContent[]},
  tvShows: {results: IVideoContent[]},
  ratedMovies: {results: IVideoContent[]},
  nowPlaying: {results: IVideoContent[]},
  upcoming: {results: IVideoContent[]},
  popular: {results: IVideoContent[]},
  topRated: {results: IVideoContent[]}
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, BannerComponent, AsyncPipe, MovieCarruselComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private auth = inject(AuthenticationService);
  private movieService = inject(MovieService);
  private loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser")!);
  private changeDetectorRef = inject(ChangeDetectorRef);

  userName = signal(this.loggedInUser.name);
  userProfileImg = signal(this.loggedInUser.photoUrl);
  email = signal(this.loggedInUser.email);

  bannerDetail$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];

  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    this.movieService.getRatedMovies(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated()
  ];
  
  ngOnInit(): void {
    forkJoin(this.sources)
    .pipe(
      map(([movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated])=>{
        this.bannerDetail$ = this.movieService.getBannerDetail(movies.results[1].id);
        this.bannerVideo$ = this.movieService.getBannerVideo(movies.results[1].id);
        return {movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated}
      })
    ).subscribe((res: Sources)=>{
      this.movies = res.movies.results;
      this.tvShows = res.tvShows.results;
      this.ratedMovies = res.ratedMovies.results;
      this.nowPlayingMovies = res.nowPlaying.results;
      this.upcomingMovies = res.upcoming.results;
      this.popularMovies = res.popular.results;
      this.topRatedMovies = res.topRated.results;
      this.changeDetectorRef.markForCheck();
    })
  }

  signOut() {
    this.auth.signOut();
  }
}