import {Component, isDevMode, OnInit} from '@angular/core';
import {PhotosService} from '../services/photos/photos.service';
import {Observable} from 'rxjs';
import {Photo} from '../models/photo';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent implements OnInit {

  photos: Observable<Photo[]>;

  constructor(private photosService: PhotosService) { }

  ngOnInit() {
    // this.photos = this.photosService.test();
  }

  test() {
    // this.photosService.test().subscribe(o => log(o));
  }

  isDevMode(): boolean {
    return isDevMode();
  }

}
