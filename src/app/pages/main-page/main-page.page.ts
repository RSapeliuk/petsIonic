import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/Post';
import {AuthService} from '../../services/auth.service';
import {AddPetPage} from '../user/pets/add-pet/add-pet.page';
import {ModalController} from '@ionic/angular';
import {PostDetailsPage} from './post-details/post-details.page';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {
  posts: Post[];

  constructor(public postService: PostService,
              public authService: AuthService,
              public modalController: ModalController) { }

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
  async onClick(postId) {
    const modal = await this.modalController.create({
      component: PostDetailsPage,
      componentProps: {
        id: postId,
      }
    });
    return await modal.present();
  }

}
