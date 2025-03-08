import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
import { AuthService } from '../../services/auth.service';

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
    MatExpansionModule,
  ],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css',
})
export class MyCoursesComponent implements OnInit {
  @Input() courses: any[] = [];
  @Output() courseLeft = new EventEmitter<number>();

  selectedCourse: any = null;
  lessons: any[] = [];

  constructor(private coursesService: CoursesService, private authService: AuthService) {}

  ngOnInit(): void {
    if (!this.courses || this.courses.length === 0) {
      const userId = this.authService.getUserId();
      if (userId) {
        this.coursesService.getStudentCourses(userId).subscribe(
          (courses) => {
            this.courses = courses.map((course) => ({ ...course, isDetailsOpen: false }));
          },
          (error) => {
            console.error('Error fetching my courses:', error);
          }
        );
      } else {
        console.error('User not authenticated.');
      }
    }
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

  leaveCourse(courseId: number) {
    const userId = this.authService.getUserId();
    if (userId) {
      this.coursesService.leaveCourse(courseId, userId).subscribe(
        (response) => {
          console.log('Left course successfully:', response);
          this.courseLeft.emit(courseId);
          this.ngOnInit();
        },
        (error) => {
          console.error('Error leaving course:', error);
        }
      );
    } else {
      console.error('User not authenticated.');
    }
  }

  toggleCourseDetails(course: any) {
    course.isDetailsOpen = !course.isDetailsOpen;
    if (course.isDetailsOpen) {
      this.showCourseDetails(course.id);
    }
  }
}