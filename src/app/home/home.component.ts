import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  auth = inject(AuthenticationService);
  name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  userProfileImg = JSON.parse(sessionStorage.getItem("loggedInUser")!).photoUrl;
  email = JSON.parse(sessionStorage.getItem("loggedInUser")!).email;

  signOut() {
    this.auth.signOut();
  }
}
