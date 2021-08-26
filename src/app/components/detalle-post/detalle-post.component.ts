import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/interfaces/post.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-detalle-post',
  templateUrl: './detalle-post.component.html',
  styleUrls: ['./detalle-post.component.css']
})
export class DetallePostComponent implements OnInit {

  post: Post | undefined;
  // post: Post ;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService ) {
        // this.post = {
        //   userId: 0,
        //   id: 0,
        //   title: '',
        //   body: ''
        // }
     }

  ngOnInit() : void {
    this.activatedRoute.params.subscribe(async (params) => {
      const id = Number(params.idPost);
      try {
        this.post = await this.postsService.getById(id);
      } catch (error) {
        console.log(error.message);
      }
    })
  }
}