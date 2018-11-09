import {Component, OnInit} from '@angular/core';
import {PendingUpload, PhotosService} from '../../services/photos/photos.service';
import {Observable} from 'rxjs';
import {Photo} from '../../models/photo';

@Component({
  selector: 'app-admin-photos',
  templateUrl: './admin.photos.component.html',
  styleUrls: ['./admin.photos.component.css']
})
export class AdminPhotosComponent implements OnInit {

  files: Array<File>;
  pendingUploads: PendingUpload[];
  photosCanDelete: Observable<Photo[]>;

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

}
