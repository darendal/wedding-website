import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireStorage} from '@angular/fire/storage';
import {Photo} from '../../models/photo';
import {AngularFirestore} from '@angular/fire/firestore';

import {finalize, map} from 'rxjs/operators';
import {LoggingService} from '../logging/logging.service';

export interface PendingUpload {
  filename: string;
  percentComplete: Observable<number>;
}

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  private readonly path: string  = 'photos';

  constructor(private storage: AngularFireStorage,
              private firestore: AngularFirestore,
              private log: LoggingService) { }

  getPhotos(): Observable<Photo[]> {
    return this.firestore.collection<Photo>(this.path).valueChanges();
  }

  getPhotosWithData(): Observable<Photo[]> {
    return this.firestore.collection<Photo>(this.path).snapshotChanges().pipe(
      map(o => o.map(p => {
        const id = p.payload.doc.id;
        const photo = p.payload.doc.data();
        photo.id = id;
        return photo;
      }))
    );
}

  uploadPhoto(file: File): PendingUpload {
    const filePath = file.name;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    task.snapshotChanges()
      .pipe(
        finalize(() => this.handleUploadSuccess(ref.getDownloadURL(), file.name))
      ).subscribe();

    return {
      filename: file.name,
      percentComplete: task.percentageChanges()
    };
  }

  private handleUploadSuccess(uploadUrl: Observable<string>, name: string): void {

    uploadUrl.subscribe(t => {
      const photo: Photo = {
        id: '',
        url: t,
        uploadDate: Date.now(),
        name: name
      };
      this.firestore.collection<Photo>(this.path).add(photo)
        .then(() => this.log.debug('Upload complete', photo))
        .catch(e => this.log.error('Error uploading photo', e, photo));
    });
  }

  deletePhoto(photo: Photo) {

    this.storage.ref(photo.name).delete().toPromise().then(() =>
      this.firestore.doc(`${this.path}/${photo.id}`).delete())
      .then(() => this.log.info('Deleted photo', photo));
  }


}
