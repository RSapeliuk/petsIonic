import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/Post';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {
  posts: Post[];

  constructor(public postService: PostService,
              public authService: AuthService) { }

  ngOnInit() {
    this.postService.getAllPosts().subscribe(value => this.posts = value);
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  logout() {
    this.authService.logout();
    window.location.reload();
  }

}
