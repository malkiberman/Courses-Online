import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { CoursesComponent } from "./components/courses/courses.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, NavigationComponent, CoursesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cuorses_online';
}
