import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TrackByFunction, inject } from '@angular/core';
import { asSignal } from '../../../shared/helpers/signal/signal-property.helper';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input({required: true}) 
  userImg = ''
  userImgSignal = asSignal(this, 'userImg');
  @Input({required: true})
  userName = ''
  userNameSignal = asSignal(this, 'userName');
  auth = inject(AuthenticationService);
  navList = ["Home", "TV Shows", "News & Popular", "My List", "Browse by Language"];
  trackByNavListId: TrackByFunction<string> = index => index;
}