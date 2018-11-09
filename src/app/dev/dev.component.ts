import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Photo} from '../models/photo';
import {PendingUpload, PhotosService} from '../services/photos/photos.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase/auth';
import {auth} from 'firebase/app';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent implements OnInit {

  files: Array<File>;
  pendingUploads: PendingUpload[];
  photosCanDelete: Observable<Photo[]>;

  isValidUser(user: User): boolean {
    return user.email === environment.authenticatedUser;
  }

  constructor(private readonly photoService: PhotosService, public fireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.photosCanDelete = this.photoService.getPhotosWithData();
  }

  filesUploaded(event) {

    this.files = Array.from(event.target.files);
  }

  submit(): void {
    this.pendingUploads = this.files.map(file => this.photoService.uploadPhoto(file) );
  }

  deleteImage(photo: Photo) {
    this.photoService.deletePhoto(photo);
  }

  login() {
    this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.fireAuth.auth.signOut();
  }


}
