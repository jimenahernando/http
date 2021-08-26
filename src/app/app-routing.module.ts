import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DetallePostComponent } from './components/detalle-post/detalle-post.component';
import { FormPostComponent } from './components/form-post/form-post.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'posts/:idPost', component: DetallePostComponent },
  { path: 'newPost', component: FormPostComponent },
  { path: 'updatePost/:idPost', component: FormPostComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
