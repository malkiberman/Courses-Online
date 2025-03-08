import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css'],
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
  ]
})
export class ManageCoursesComponent implements OnInit {
  courses: any[] = [];
  courseForm!: FormGroup;
  lessonForm!: FormGroup;
  selectedCourse: any = null;
  lessons: any[] = [];
  errorMessage: string = '';
  isAddCourseFormOpen: boolean = false;
  addLessonFormOpen: boolean = false;
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.checkUserRole();
    this.initForms();
    this.loadCourses();
  }

  private checkUserRole(): void {
    const role = this.authService.getRole();
    if (role !== 'admin' && role !== 'teacher') {
      this.router.navigate(['/home']);
    }
  }

  private initForms(): void {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });

    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['']
    });
  }

  private loadCourses(): void {
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses.map(course => ({
          ...course,
          isDetailsOpen: false,
          isEditFormOpen: false,
          isLessonsAccordionOpen: false
        }));
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      }
    });
  }


  addCourse(): void {
    this.coursesService.addCourse(this.courseForm.value).subscribe({
      next: () => {
        this.ngOnInit();
        this.courseForm.reset();
        this.isAddCourseFormOpen = false;
      },
      error: (error) => {
        console.error('Error adding course:', error);
        this.errorMessage = error.error.message || 'An error occurred. Please try again.';
      }
    });
  }

  editCourse(course: any): void {
    this.showCourseDetails(course.id);
  }

  updateCourse(courseId: number): void {
    const teacherId = this.authService.getUserId();

    if (!teacherId) {
      this.errorMessage = 'לא ניתן לעדכן קורס ללא זיהוי מורה.';
      return;
    }

    const updates = {
      title: this.courseForm.value.title,
      description: this.courseForm.value.description,
      teacherId: teacherId
    };

    this.coursesService.updateCourse(courseId, updates).subscribe({
      next: (updatedCourse) => {
        if (this.selectedCourse && this.selectedCourse.id === courseId) {
          this.selectedCourse = updatedCourse;
        }
        this.loadCourses();
        this.courseForm.reset();
        this.courses.find(c => c.id === courseId)!.isEditFormOpen = false;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error updating course:', error);
        this.errorMessage = 'אירעה שגיאה בעדכון הקורס. אנא נסה שנית מאוחר יותר.';
      }
    });
  }

  deleteCourse(courseId: number): void {
    this.coursesService.deleteCourse(courseId).subscribe({
      next: () => {
        this.loadCourses();
      },
      error: (error) => {
        console.error('Error deleting course:', error);
        this.errorMessage = error.error.message || 'An error occurred. Please try again.';
      }
    });
  }

  showCourseDetails(courseId: number): void {
    this.coursesService.getCourseDetails(courseId).subscribe({
      next: (course) => {
        this.selectedCourse = course;
      },
      error: (error) => {
        console.error('Error fetching course details:', error);
        this.errorMessage = error.error.message || 'An error occurred. Please try again.';
      }
    });

    this.coursesService.getLessons(courseId).subscribe({
      next: (lessons) => {
        this.lessons = lessons.map(lesson => ({ ...lesson, isEditFormOpen: false }));
      },
      error: (error) => {
        console.error('Error fetching lessons:', error);
        this.errorMessage = error.error.message || 'An error occurred. Please try again.';
      }
    });
  }

  addLesson(courseId: number): void {
    this.coursesService.addLesson(courseId, this.lessonForm.value).subscribe({
      next: () => {
        this.showCourseDetails(courseId);
        this.lessonForm.reset();
      },
      error: (error) => {
        console.error('Error adding lesson:', error);
        this.errorMessage = error.error.message || 'An error occurred. Please try again.';
      }
    });
  }

  updateLesson(courseId: number, lessonId: number): void {
    const updates = {
      title: this.lessonForm.value.title,
      content: this.lessonForm.value.content,
      courseId: courseId // הוספת courseId ל-updates
    };
  
    this.coursesService.updateLesson(courseId, lessonId, updates).subscribe({
      next: () => {
        this.showCourseDetails(courseId);
        this.lessonForm.reset();
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error updating lesson:', error);
        this.errorMessage = 'אירעה שגיאה בעדכון השיעור. אנא נסה שנית מאוחר יותר.';
      }
    });
  }

  deleteLesson(courseId: number, lessonId: number): void {
    this.coursesService.deleteLesson(courseId, lessonId).subscribe({
      next: () => {
        this.showCourseDetails(courseId);
      },
      error: (error) => {
        console.error('Error deleting lesson:', error);
        this.errorMessage = error.error.message || 'An error occurred. Please try again.';
      }
    });
  }

  toggleEditForm(course: any): void {
    this.courseForm.reset();
    course.isEditFormOpen = !course.isEditFormOpen;
    if (course.isEditFormOpen) {
      this.courseForm.patchValue(course);
    }
  }

  toggleLessonEditForm(lesson: any): void {
    lesson.isEditFormOpen = !lesson.isEditFormOpen;
    this.lessonForm.patchValue(lesson);
  }

  toggleCourseDetails(course: any): void {
    course.isDetailsOpen = !course.isDetailsOpen;
    if (course.isDetailsOpen) {
      this.showCourseDetails(course.id);
    }
  }

  toggleLessonsAccordion(course: any): void {
    course.isLessonsAccordionOpen = !course.isLessonsAccordionOpen;
  }

  openAll(): void {
    this.accordion.openAll();
  }

  closeAll(): void {
    this.accordion.closeAll();
  }

  toggleAddCourseForm(): void {
    this.isAddCourseFormOpen = !this.isAddCourseFormOpen;
    this.courseForm.reset();
  }
  toggleLessonAddForm(): void {
    this.addLessonFormOpen = !this.addLessonFormOpen;
    this.lessonForm.reset();
  }
}