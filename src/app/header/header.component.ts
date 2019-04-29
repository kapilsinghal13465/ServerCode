import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListnerSubs: Subscription;
  isUserAuthticated = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isUserAuthticated = this.authService.getIsAuth();
    this.authListnerSubs = this.authService.getAuthStatusListner().subscribe( isAuthticated => {
      this.isUserAuthticated = isAuthticated;
    });
  }

  ngOnDestroy() {
    this.authListnerSubs.unsubscribe();
  }

  onLogOut() {
    this.authService.logOut();
  }

}
