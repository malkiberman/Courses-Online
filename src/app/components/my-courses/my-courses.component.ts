import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/coursesdata.service';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {
  courses: any[] = [];
  selectedCourse: any = null;
  lessons: any[] = [];

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.coursesService.getMyCourses().subscribe(
      (courses) => {
        this.courses = courses;
      },
      (error) => {
        console.error('Error fetching my courses:', error);
      }
    );
  }

  showCourseDetails(courseId: number) {
    this.coursesService.getCourseDetails(courseId).subscribe(
      (course) => {
        this.selectedCourse = course;
      },
      (error) => {
        console.error('Error fetching course details:', error);
      }
    );

    this.coursesService.getLessons(courseId).subscribe(
      (lessons) => {
        this.lessons = lessons;
      },
      (error) => {
        console.error('Error fetching lessons:', error);
      }
    );
  }
}