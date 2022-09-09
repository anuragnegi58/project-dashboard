import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  createTask(data: any) {
let taskObj: any = {};
taskObj = data;
taskObj.type = 'todo';

let allTask: any = [];
taskObj.type = 'todo';
    allTask = localStorage.getItem('allTask') ? JSON.parse(localStorage.getItem('allTask')!.toString()) : [];
    allTask.push(taskObj)
localStorage.setItem('allTask', JSON.stringify(allTask));
  }
}
