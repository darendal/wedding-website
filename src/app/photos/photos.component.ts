import { Component, OnInit } from '@angular/core';
import {PhotosService} from '../services/photos/photos.service';
import {Photo} from '../models/photo';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  photos: Photo[];
  isLoaded: boolean;

  constructor(private photoService: PhotosService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.getPhotos();
  }

  getPhotos(): void {
     this.photoService.getPhotos()
       .subscribe(response => {
         this.isLoaded = true;
         this.photos = response.resources;
       });
  }

}
