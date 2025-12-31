import { Component, OnInit } from '@angular/core';
import { Posts } from '../service/posts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post implements OnInit {
  posts: any[] = [];
  postData = {title: '', body: ''};
  editMode = false;
  editId: number | null = null;

  constructor(private postService: Posts) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPost().subscribe(data => {
      this.posts = data.slice(0, 10)
    });
  }

  // function to submit post
  submitPost() {
    if (this.editMode) {
      this.postService.updatePost(this.editId!, this.postData).subscribe(() => {
        const index = this.posts.findIndex(p => p.id === this.editId);
        this.posts[index] = { ...this.posts[index], ...this.postData };
        this.resetForm();
      });
    } else {
      this.postService.addPost(this.postData).subscribe(res => {
        this.posts.unshift({
          id: Math.floor(Math.random() * 1000),
          ...this.postData
        });
        this.resetForm();
      });
    }
  }

  // function to edit post
  editPost(post: any) {
    this.editMode = true;
    this.editId = post.id;
    this.postData = { title: post.title, body: post.body };
  }

  // function to delete post
  deletePost(id: number) {
  this.postService.deletePost(id).subscribe(() => {
    this.posts = this.posts.filter(post => post.id !== id);
  });
}


  resetForm() {
    this.postData = { title: '', body: '' };
    this.editMode = false;
    this.editId = null;
  }
}
