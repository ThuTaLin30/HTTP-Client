import { Component ,OnInit,OnDestroy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapType } from '@angular/compiler';

import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,OnDestroy {
[x: string]: any;
  loadedPosts :Post []=[];
  isFetching =false;
  error='';
  private errorSub =new Subscription;
  
  constructor(private http: HttpClient,private postsService:PostsService){}
 ngOnInit(): void {
  this.errorSub=this.postsService.error.subscribe(errorMessage=>{
    this.error= errorMessage
  })
  this.isFetching = true;
  this.postsService.fetchPost().subscribe(posts=>{
    this.isFetching =false;
    this.loadedPosts = posts;
  },error =>{
    this.error= error.message;
    console.log(error)
  });
   
 }
 onCreatePost(postData:Post){
  this.postsService.createAndStorePost(postData.title,postData.content);
 }
 onFetchPosts(){
  this.isFetching=true;
  this.postsService.fetchPost().subscribe(posts=>{
    this.isFetching=false;
    this.loadedPosts =posts
  } )
   
  
 }
 
 onClearPosts(){
  this.postsService.deletePosts().subscribe(()=>{
    this.loadedPosts=[];
  }
  )}
  onHandleError(){
    this.error='';
  }
  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

}
