import { Component, OnInit } from '@angular/core';
import {faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { inject } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  faSignOutAlt = faSignOutAlt;

  ngOnInit() {
  }

  logout() {
    inject(AuthService).logout();
  }
}
