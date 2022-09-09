import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  taskForm = this.formBuilder.group({
		title: new FormControl(''),
		image: new FormControl(''),
		priority: new FormControl('', []),
		description: new FormControl('', [])
	});
	constructor(private formBuilder: FormBuilder, private route: Router, private sharedService: SharedService) { }

	ngOnInit() {
	}

	onSubmit() {
			const _v = this.taskForm.value;
			this.sharedService.createTask(_v);
      this.route.navigate(['home']);


	}
  cancelTask() {
    this.taskForm.reset();
    this.route.navigate(['home']);
  }
}
