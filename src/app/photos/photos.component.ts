import {Component, OnInit} from '@angular/core';
import {PhotosService} from '../services/photos/photos.service';
import {Photo} from '../models/photo';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  photos: Observable<Photo[]>;
  isLoaded: boolean;

  constructor(private photoService: PhotosService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.getPhotos();
  }

  getPhotos(): void {
     this.photos = this.photoService.getPhotos();
     this.photos.subscribe( () => this.isLoaded = true);
  }

}
