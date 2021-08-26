import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-form-post',
  templateUrl: './form-post.component.html',
  styleUrls: ['./form-post.component.css']
})
export class FormPostComponent implements OnInit {

  formPost:FormGroup;
  post: Post | undefined;
  title: string = '';

  constructor( 
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    private router: Router) { 
    this.formPost = new FormGroup({
      title: new FormControl(this.post?.title,[ Validators.required, Validators.minLength(5)]),
      body: new FormControl(this.post?.body, [Validators.required]),
      userId: new FormControl('',[])
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params?.subscribe(async params => {
      console.log(params.idPost);
      if (params.idPost){
        this.title = "Modificar Post";
        this.post = await this.postsService.getById(Number(params.idPost));
        this.formPost = new FormGroup({
          title: new FormControl(this.post?.title, [Validators.required, Validators.minLength(5)]),
          body: new FormControl(this.post?.body, [Validators.required]),
          userId: new FormControl(this.post?.userId,[]),
          id: new FormControl(this.post?.id,[])
        });
      }else{
        this.title = "Crear nuevo Post";
      }
    })
  }

  async onSubmit(){
    let alert = '';
    if(this.formPost.value.id){
      this.post =  await this.postsService.update(this.formPost.value);
      console.log(this.post)
      alert = "update";
    }else{
      this.post =  await this.postsService.create(this.formPost.value);
      console.log(this.post)
      alert = "create";
    }
    
    if(this.post?.id){
      this.router.navigate(['/home'], { queryParams : { tipo: alert, estado: 'ok'}});
    }
  }

  checkInput( controlName: string, validatorName: string) : boolean{
    if(this.formPost.get(controlName)?.hasError(validatorName) && this.formPost.get(controlName)?.touched){
      return true;
    } else {
      return false;
    }
  }

}
