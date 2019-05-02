import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User} from 'firebase/app';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.css']
})
export class DevComponent {

  constructor(public fireAuth: AngularFireAuth) { }

  login() {
    this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.fireAuth.auth.signOut();
  }

  isValidUser(user: User): boolean {
    return user.email === environment.authenticatedUser;
  }

}
