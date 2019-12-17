import { Component, OnInit } from '@angular/core';
import {Post} from '../../../models/Post';
import {User} from '../../../models/User';
import {Pet} from '../../../models/Pet';
import {PetService} from '../../../services/pet.service';
import {AuthService} from '../../../services/auth.service';
import {PostService} from '../../../services/post.service';
import {ImageUploadService} from '../../../services/image-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;
  editable = false;
  file: File;
  constructor(public authUser: AuthService,
              public imageService: ImageUploadService) { }

  ngOnInit() {
    this.authUser.getUser().subscribe(value => {
      console.log(value);
      this.user = value;
    });
  }
  updateUser() {
    if (this.file != null) {
      this.imageService.updateUserAvatar(this.file, this.user.avatar, this.user).subscribe(value => {
        console.log(value);
      });
    }
    this.authUser.updateUser(this.user).subscribe(value => console.log(value));
    this.editable = false;
  }

  cancelEdit() {
    this.editable = false;
  }

  editUser() {
    this.editable = true;
  }
}
