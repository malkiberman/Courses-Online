import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from '../../services/coursesdata.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-manage-courses',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatListModule, MatIconModule],
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css']
})
export class ManageCoursesComponent implements OnInit {
  courses: any[] = [];
  courseForm!: FormGroup;
  lessonForm!: FormGroup;
  selectedCourse: any = null;
  lessons: any[] = [];
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private coursesService: CoursesService) { }

  ngOnInit(): void {
    const role = this.authService.getRole();
    if (role !== 'admin' && role !== 'teacher') {
      this.router.navigate(['/home']);
      return;
    }

    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });

    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['']
    });

    this.coursesService.getCourses().subscribe(
      (courses) => {
        this.courses = courses;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  addCourse() {
    this.coursesService.addCourse(this.courseForm.value).subscribe(
      () => {
        this.ngOnInit();
        this.courseForm.reset();
      },
      (error) => {
        console.error('Error adding course:', error);
        this.errorMessage = error.error.message || 'An error occurred. Please try again.';
      }
    );
  }

  editCourse(course: any) {
    this.showCourseDetails(course.id);
  }

  updateCourse(courseId: number) {
    this.coursesService.updateCourse(courseId, this.courseForm.value).subscribe(
      (updatedCourse) => {
        if (this.selectedCourse && this.selectedCourse.id === courseId) {
          this.selectedCourse = updatedCourse;
        }
        this.coursesService.getCourses().subscribe(courses => this.courses = courses);
        this.courseForm.reset();
      },
      (error) => {
        console.error('Error updating course:', error);
        this.errorMessage = error.error.message || 'An error occurred. Please try again.';
      }
    );
  }

  deleteCourse(courseId: number) {
    this.coursesService.deleteCourse(courseId).subscribe(
      () => {
        this.ngOnInit();
      },
      (error) => {
        console.error('Error deleting course:', error);
        this.errorMessage = error.error.message || 'An error occurred. Please try again.';
      }
    );
  }

  showCourseDetails(courseId: number) {
    this.coursesService.getCourseDetails(courseId).subscribe(
      (course) => {
        this.selectedCourse = course;
        this.courseForm.patchValue(course);
      },
      (error) => {
        console.error('Error fetching course details:', error);
        this.errorMessage = error.error.message || 'An error occurred. Please try again.';
      }
    );

    this.coursesService.getLessons(courseId).subscribe(
      (lessons) => {
        this.lessons = lessons;
      },
      (error) => {
        console.error('Error fetching lessons:', error);
        this.errorMessage = error.error.message || 'An error occurred. Please try again.';
      }
    );
  }

  addLesson(courseId: number) {
    this.coursesService.addLesson(courseId, this.lessonForm.value).subscribe(
      () => {
        this.showCourseDetails(courseId);
        this.lessonForm.reset();
      },
      (error) => {
        console.error('Error adding lesson:', error);
        this.errorMessage = error.error.message || 'An error occurred. Please try again.';
      }
    );
  }

  updateLesson(courseId: number, lessonId: number) {
    this.coursesService.updateLesson(courseId, lessonId, this.lessonForm.value).subscribe(
      () => {
        this.showCourseDetails(courseId);
        this.lessonForm.reset();
      },
      (error) => {
        console.error('Error updating lesson:', error);
        this.errorMessage = error.error.message || 'An error occurred. Please try again.';
      }
    );
  }

  deleteLesson(courseId: number, lessonId: number) {
    this.coursesService.deleteLesson(courseId, lessonId).subscribe(
      () => {
        this.showCourseDetails(courseId);
      },
      (error) => {
        console.error('Error deleting lesson:', error);
        this.errorMessage = error.error.message || 'An error occurred. Please try again.';
      }
    );
  }
}