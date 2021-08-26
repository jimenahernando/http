import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  arrPost: Post[];
  alertCreate: boolean = false;
  alertDelete: boolean = false;
  alertUpdate: boolean = false;

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) {
    this.arrPost = [];
  }

  ngOnInit(): void {
    // cuando cargamos componente pedimos los datos al servicio
    this.postsService.getAll()
      .then((result: Post[]) => this.arrPost = result)
      .catch(error => console.log(error));

    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.alertCreate = (queryParams.estado === 'ok' && queryParams.tipo === "create") ? true : false;
      this.alertUpdate = (queryParams.estado === 'ok' && queryParams.tipo === "update") ? true : false;
    })
  }

  quitarAlert(pAlert: string){
    if(pAlert === 'create' || pAlert == 'update'){
      setTimeout(() => {
        this.router.navigate(['/home'])
      }, 500);
    } else if(pAlert === 'delete'){
      this.alertDelete = true;
    }
  }

  async borrarPost(idPost: number | undefined){
    try {
      const mensaje = await this.postsService.delete(idPost);
      if(mensaje){
        this.alertDelete = true;
      }
    } catch (error) {
      console.log(error);
    }

  }
}
