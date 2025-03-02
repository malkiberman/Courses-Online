import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../../services/coursesdata.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule
  ],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {
  courses: any[] = [];
  selectedCourse: any = null;
  lessons: any[] = [];

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe(
      (courses) => {
        this.courses = courses.map(course => ({ ...course, isDetailsOpen: false }));
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

  joinCourse(courseId: number) {
    this.coursesService.joinCourse(courseId).subscribe(
      (response) => {
        console.log('Joined course successfully:', response);
        this.ngOnInit();
      },
      (error) => {
        console.error('Error joining course:', error);
      }
    );
  }

  toggleCourseDetails(course: any) {
    course.isDetailsOpen = !course.isDetailsOpen;
    if (course.isDetailsOpen) {
      this.showCourseDetails(course.id);
    }
  }
}