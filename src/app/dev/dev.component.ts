import {Component, isDevMode, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Photo} from '../models/photo';
import {log} from 'util';

import {PendingUpload, PhotosService} from '../services/photos/photos.service';


@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent implements OnInit {

  files: Array<File>;
  pendingUploads: PendingUpload[];
  photosCanDelete: Observable<Photo[]>


  constructor(private readonly photoService: PhotosService) { }

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


}
