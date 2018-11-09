import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireStorage} from '@angular/fire/storage';
import {Photo} from '../../models/photo';
import {AngularFirestore} from '@angular/fire/firestore';
import {log} from 'util';

import {finalize, map} from 'rxjs/operators';

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
              private firestore: AngularFirestore) { }

  getPhotos(): Observable<Photo[]> {
    return this.firestore.collection<Photo>(this.path).valueChanges();
  }

  getPhotosWithData(): Observable<Photo[]> {
    log('test');
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
        .then(log('success'))
        .catch(e => log(e));
    });
  }

  deletePhoto(photo: Photo) {

    this.storage.ref(photo.name).delete().toPromise().then(() =>
      this.firestore.doc(`${this.path}/${photo.id}`).delete()).then(() => log('success'));
  }


}
