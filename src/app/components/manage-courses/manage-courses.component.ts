import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // ייבוא ReactiveFormsModule

import { CoursesService } from '../../services/coursesdata.service';

@Component({
  selector: 'app-manage-courses',
  standalone: true,
  imports: [ReactiveFormsModule], // הוספת ReactiveFormsModule
  templateUrl: './manage-courses.component.html',
  styleUrl: './manage-courses.component.css'
})
export class ManageCoursesComponent implements OnInit {
  courses: any[] = [];
  courseForm!: FormGroup;
  lessonForm!: FormGroup;
  selectedCourse: any = null;
  lessons: any[] = [];

  constructor(private fb: FormBuilder, private coursesService: CoursesService) { }

  ngOnInit(): void {
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
      }
    );
  }

  updateCourse(courseId: number) {
    this.coursesService.updateCourse(courseId, this.courseForm.value).subscribe(
      () => {
        this.ngOnInit();
        this.courseForm.reset();
      },
      (error) => {
        console.error('Error updating course:', error);
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

  addLesson(courseId: number) {
    this.coursesService.addLesson(courseId, this.lessonForm.value).subscribe(
      () => {
        this.showCourseDetails(courseId);
        this.lessonForm.reset();
      },
      (error) => {
        console.error('Error adding lesson:', error);
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
      }
    );
  }
}