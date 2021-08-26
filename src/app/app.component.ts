import { Component, OnInit } from '@angular/core';
import { Post } from './interfaces/post.interface';
import { PostsService } from './services/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(){
  }

  ngOnInit(): void {
  } 
}
