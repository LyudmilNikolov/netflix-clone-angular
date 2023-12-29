import { animate, style, transition, trigger } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { asSignal } from '../../helpers/signal/signal-property.helper';
import { IVideoContent } from '../../models/video-content.interface';
import { DescriptionPipe } from '../../pipes/description.pipe';
import { ImagePipe } from '../../pipes/image.pipe';

@Component({
  selector: 'app-movie-carrusel',
  standalone: true,
  imports: [NgFor, NgIf, DescriptionPipe, ImagePipe],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ],
  templateUrl: './movie-carrusel.component.html',
  styleUrl: './movie-carrusel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCarruselComponent implements AfterViewInit {
  @Input() videoContents: IVideoContent[] = [];
  @Input() 
  title = ''
  titleSignal = asSignal(this, 'title');
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  selectedContentId: number | null = null;

  ngAfterViewInit(): void {
    const checkDataInterval = setInterval(() => {
      if (this.videoContents.length) {
        this.initSwiper();
        clearInterval(checkDataInterval);
      }
    }, 100);
  }

  private initSwiper() {
    return new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 3,
      slidesPerGroup: 2,
      centeredSlides: true,
      loop: true,
      breakpoints: {
        600: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 5,
          centeredSlides: true,
        },
        900: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1500: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1800: {
          slidesPerView: 5,
          slidesPerGroup: 6,
          spaceBetween: 5,
          centeredSlides: false,
        }
      }
    })
  }

  setHoverMovie(movie: IVideoContent) {
    this.selectedContentId = movie.id;
  }

  clearHoverMovie() {
    this.selectedContentId = null;
  }

  isSelectedContent(movie: IVideoContent): boolean {
    return movie.id === this.selectedContentId;
  }
}