import {Component, isDevMode, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Photo} from '../models/photo';
import {log} from 'util';

import {PendingUpload, PhotosService} from '../services/photos/photos.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User} from 'firebase';


@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent implements OnInit {

  files: Array<File>;
  pendingUploads: PendingUpload[];
  photosCanDelete: Observable<Photo[]>;


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

  isDevMode(): boolean {
    const dev =  isDevMode();
    if (!dev) {
      log('Nosey little fucker, aren\'t ya?');
    }
    return dev;
  }

  login() {
    this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.fireAuth.auth.signOut();
  }

  isValidUser(user: User): boolean {
    return user.email === 'bware43@gmail.com';
  }

}
