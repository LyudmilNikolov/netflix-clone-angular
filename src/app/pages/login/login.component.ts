import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  constructor(private authService: AuthenticationService) {}
}