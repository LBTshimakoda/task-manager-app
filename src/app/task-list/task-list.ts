import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent implements OnInit {
  private taskService = inject(TaskService);
  newTask = signal('');

  // Get tasks from service instead of local array
  get tasks() {
    return this.taskService.tasks;
  }

  ngOnInit() {
    this.taskService.loadTasks();
  }

  addTask() {
    if (this.newTask().trim()) {
      this.taskService.addTask(this.newTask());
      this.newTask.set('');
    }
  }

  toggleComplete(task: any) {
    this.taskService.toggleComplete(task);
  }
}