import { Component } from '@angular/core';
import { CourseService } from '../../services/coursesdata.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [AsyncPipe,NgIf],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {

courses!: any[];

constructor(private courseService: CourseService) { }

ngOnInit() {
  console.log('Inside ngOnInit'); 
  
 this.getCourses();
}

getCourses() {
  console.log('Fetching courses...');
  this.courseService.getCourses().subscribe({
    next: (courses) => {
      console.log('Courses fetched:', courses);
      this.courses = courses;
    },
    error: (error) => {
      console.error('Error fetching courses:', error);
    }
  });
}
joinCourse(courseId: number) {
  this.courseService.joinCourse(courseId).subscribe(() => {
    this.getCourses(); // רענון רשימת הקורסים
  });
}

leaveCourse(courseId: number) {
  this.courseService.leaveCourse(courseId).subscribe(() => {
    this.getCourses(); // רענון רשימת הקורסים
  });
}
}

