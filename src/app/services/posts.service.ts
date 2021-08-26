import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  baseUrl: string;


  constructor( private httpClient: HttpClient ) {
    this.baseUrl = 'https://jsonplaceholder.typicode.com/posts/';
  }
  
  getAll() : Promise<Post[]>{
    return this.httpClient.get<Post[]>(this.baseUrl).toPromise();
  }
  
  getById(id: number): Promise<Post>{
    return this.httpClient.get<Post>(this.baseUrl+ id).toPromise();
  }
  
  create(pForm: any) : Promise<Post>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8'
      })
    }
    return this.httpClient.post<Post>(this.baseUrl, pForm, httpOptions).toPromise();
  }
  
  update(pForm: any) : Promise<Post>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8'
      })
    }
    return this.httpClient.put<Post>(this.baseUrl + pForm.id, pForm, httpOptions).toPromise();
  }

  delete(idPost: number | undefined) : Promise<any>{
    return this.httpClient.delete<any>(this.baseUrl + idPost).toPromise();
  }
}
