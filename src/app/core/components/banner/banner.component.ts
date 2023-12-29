import { ChangeDetectionStrategy, Component, Input, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { asSignal } from '../../../shared/helpers/signal/signal-property.helper';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent {
  @Input({required: true}) 
  bannerTitle = ''
  bannerTitleSignal = asSignal(this, 'bannerTitle');
  @Input() 
  bannerOverview = ''
  bannerOverviewSignal = asSignal(this, 'bannerOverview');
  @Input() 
  key = 'qAqNtJgsh_E'
  keySignal = asSignal(this, 'key');
  private sanitizer = inject(DomSanitizer)
  videoUrl = signal(this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.keySignal()}?autoplay=1&mute=1&loop=1&controls=0`));
}
