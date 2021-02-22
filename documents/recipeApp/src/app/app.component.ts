import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService:AuthService,
    private router: Router
  ) {}
  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth')

  }
}
