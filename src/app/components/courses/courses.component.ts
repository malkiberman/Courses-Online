import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/coursesdata.service'; // ייבוא שירות מתוקן

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];

  constructor(private coursesService:CoursesService ) { } // שימוש בשירות מתוקן

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
    this.coursesService.joinCourse(courseId).subscribe(
      () => {
        this.ngOnInit();
      },
      (error) => {
        console.error('Error joining course:', error);
      }
    );
  }

  leaveCourse(courseId: number) {
    this.coursesService.leaveCourse(courseId).subscribe(
      () => {
        this.ngOnInit();
      },
      (error) => {
        console.error('Error leaving course:', error);
      }
    );
  }
}