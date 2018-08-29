import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {PhotosRespose} from '../photos.respose';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  url = 'https://weddingphotosservice.azurewebsites.net/api/HttpTriggerCSharp1?code=7PsP1lPY1uuUaiTuCxnEUvbI2ITlS4nLVrEluaobyz3d9CEOcDR1tw==';
  constructor(private http: HttpClient) { }

  getPhotos(): Observable<PhotosRespose> {
    return this.http.get<PhotosRespose>(this.url, httpOptions);
  }

}
