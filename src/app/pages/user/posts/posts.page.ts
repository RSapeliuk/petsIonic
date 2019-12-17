import { Component, OnInit } from '@angular/core';
import {PetService} from '../../../services/pet.service';
import {AuthService} from '../../../services/auth.service';
import {PostService} from '../../../services/post.service';
import {ImageUploadService} from '../../../services/image-upload.service';
import {User} from '../../../models/User';
import {Post} from '../../../models/Post';
import {Pet} from '../../../models/Pet';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  user: User;
  userPosts: Post[];
  userPets: Pet[];
  constructor(public authUser: AuthService,
              public postService: PostService,
              public petService: PetService) { }

  ngOnInit() {
    this.authUser.getUser().subscribe(value => {
      console.log(value);
      this.user = value;
    });
    setTimeout(() => {
      this.postService.getAllUserPostsById(this.user).subscribe(value => {
        this.userPosts = value;
      });
      this.petService.getPets(this.user).subscribe(value => this.userPets = value);
    }, 1000);
  }

}
