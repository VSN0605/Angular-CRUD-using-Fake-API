import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Post } from './post/post';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Post],
  template: `<app-post></app-post>`,
  styleUrls: ['./app.css']
})
export class App {
  // protected readonly title = signal('angular-crud');
}
