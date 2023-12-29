import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
  standalone: true
})
export class ImagePipe implements PipeTransform {
  transform(imagePath: string): string {
    if (!imagePath || typeof imagePath !== 'string') {
      return '';
    }
    return `https://image.tmdb.org/t/p/w500/${imagePath}`;
  }
}