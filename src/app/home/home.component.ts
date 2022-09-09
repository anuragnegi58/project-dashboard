import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allTodoTask: any = [];
  allInProgressTask: any = [];
  allCompletedTask: any = [];
  show: boolean = false;
  allTaskTitle: any = [];
  allTask: any = [];
  taskForm = this.formBuilder.group({
    task: new FormControl(''),
    action: new FormControl(''),
  });
  @ViewChild('closeModal')
  closeModal!: ElementRef;
  constructor(private route: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.fetchAllTask();
  }
  fetchAllTask() {
    this.allTask = JSON.parse(localStorage.getItem('allTask')!.toString());
    this.allTodoTask = this.allTask.filter((item: any) => item.type === 'todo');
    this.allTaskTitle = this.allTask;
    this.allInProgressTask = this.allTask.filter(
      (item: any) => item.type === 'inprogress'
    );
    this.allCompletedTask = this.allTask.filter(
      (item: any) => item.type === 'completed'
    );
  }
  navigateTo() {
    this.route.navigate(['add']);
  }
  showModal() {
    this.show = !this.show;
  }
  submitModal() {
    let data = this.taskForm.value;
    if (!data.task || !data.action) {
      alert('Please select both the dropdown.');
      this.taskForm.reset();
      return;
    }
    this.allTask.forEach((element: any) => {
      if (element.title === data.task) {
        if (data.action === 'In Progress') {
          element.type = 'inprogress';
        }
        if (data.action === 'Completed') {
          element.type = 'completed';
        }
        if (data.action === 'To Do') {
          element.type = 'todo';
        }
      }
    });
    localStorage.setItem('allTask', JSON.stringify(this.allTask));
    this.taskForm.reset();
    this.closeModal.nativeElement.click();
    this.fetchAllTask();
  }
}
