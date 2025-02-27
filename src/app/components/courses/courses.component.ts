import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/coursesdata.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  baseUrl = 'http://localhost:3000/api/courses'; // כתובת ה-API

  constructor(private coursesService: CoursesService, private authService: AuthService) { }

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe(
      (courses) => {
        this.courses = courses;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  joinCourse(courseId: number) {
   console.log("join success");
   
  }

  leaveCourse(courseId: number) {
    console.log("leave success");
    
  }
}