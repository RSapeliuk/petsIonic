import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/User';
import {Post} from '../../../models/Post';
import {PostService} from '../../../services/post.service';
import {AuthService} from '../../../services/auth.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {
  post: Post;
  rating: number;
  user: User;
  @Input() id: number;

  constructor(public postService: PostService,
              public authUser: AuthService,
              public modalCtrl: ModalController) { }

  ngOnInit() {
    this.postService.getPostById(this.id).subscribe(value => {
      this.post = value;
      console.log(this.post);
    });
    this.authUser.getUser().subscribe(value => this.user = value);
  }
  updateUserRating(event) {
    this.rating = event.valueOf();
    if (this.user) {
      this.authUser.updateUserRating(this.post.user, this.rating).subscribe(value => this.post.user.rating = value);
    }
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
