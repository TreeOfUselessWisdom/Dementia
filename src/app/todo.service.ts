import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Todo } from './todo';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todos: Todo[] = [];
  private storageKey = 'angular-todo-app';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadTodos();
  }

  private loadTodos(): void {
    if (this.isBrowser) {
      const savedTodos = localStorage.getItem(this.storageKey);
      this.todos = savedTodos ? JSON.parse(savedTodos) : [];
    }
  }

  getTodos(): Todo[] {
    return [...this.todos];
  }

  addTodo(title: string): void {
    this.todos = [...this.todos, {
      id: Date.now(),
      title: title.trim(),
      completed: false
    }];
    this.save();
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.save();
  }

  toggleTodo(id: number): void {
    this.todos = this.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.save();
  }

  private save(): void {
    if (this.isBrowser) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
    }
  }
}