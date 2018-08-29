import { Component, OnInit } from '@angular/core';
import {PhotosService} from '../photos.service';
import {Photo} from '../photo';
import {log} from 'util';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  photos: Photo[];

  constructor(private photoService: PhotosService) { }

  ngOnInit() {
    this.getPhotos();
  }

  getPhotos(): void {
     this.photoService.getPhotos()
       .subscribe(response => {
         log(response);
         this.photos = response.resources;
         log(this.photos);
       });
  }

}
