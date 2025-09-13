import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface TaskItem {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://taskmanager-api-fde8a4cpcqhgchg2.westeurope-01.azurewebsites.net/api/tasks'; //'http://localhost:5000/api/tasks'
  
  // Signal to hold tasks
  tasks = signal<TaskItem[]>([]);

  constructor(private http: HttpClient) {}

  loadTasks() {
    this.http.get<TaskItem[]>(this.apiUrl).subscribe({
      next: (data) => this.tasks.set(data),
      error: (err) => console.error('Error loading tasks:', err)
    });
  }

  addTask(title: string) {
    const newTask = { title, isCompleted: false } as TaskItem;
    
    this.http.post<TaskItem>(this.apiUrl, newTask).subscribe({
      next: (task) => this.tasks.update(current => [...current, task]),
      error: (err) => console.error('Error adding task:', err)
    });
  }

  toggleComplete(task: TaskItem) {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    
    this.http.put<TaskItem>(`${this.apiUrl}/${task.id}`, updatedTask).subscribe({
      next: (updated) => {
        this.tasks.update(current => 
          current.map(t => t.id === updated.id ? updated : t)
        );
      },
      error: (err) => console.error('Error updating task:', err)
    });
  }
}