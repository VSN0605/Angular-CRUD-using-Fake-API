import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Posts {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  // to get posts
  getPost(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // to add the post
  addPost(post: any): Observable<any> {
    return this.http.post(this.apiUrl, post);
  }

  // to update the post
  updatePost(id: number, post:any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, post);
  }

  // to delete the post
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
