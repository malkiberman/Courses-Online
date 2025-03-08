import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navigation',
  standalone: true,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  imports: [RouterLink, RouterLinkActive, NgIf,MatToolbarModule]
})
export class NavigationComponent {
  constructor(public authService: AuthService) { }
}