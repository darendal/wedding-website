import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireStorage} from '@angular/fire/storage';
import {Photo} from '../../models/photo';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private storage: AngularFireStorage,
              private firestore: AngularFirestore) { }

  getPhotos(): Observable<Photo[]> {
    return this.firestore.collection<Photo>('photos').valueChanges();
  }

}
