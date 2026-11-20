import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  pageTitle = signal('Task Manager');
  newTaskTitle = signal('');
  
  tasks = signal<Task[]>([
    { id: 1, title: 'Set up Angular project', completed: true },
    { id: 2, title: 'Build component template', completed: false }
  ]);

  addTask() {
    const title = this.newTaskTitle().trim();
    if (!title) return;

    this.tasks.update(list => [
      ...list,
      { id: Date.now(), title, completed: false }
    ]);
    this.newTaskTitle.set('');
  }

  toggleTask(id: number) {
    this.tasks.update(list =>
      list.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }
}
