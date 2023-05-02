import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/service/authentication.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user!: User | null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthenticationService
  ) {
    this.profileForm = this.initForm(null);
  }

  ngOnInit(): void {
    this.authService
      .getFirebaseUser()
      .pipe(
        tap((user: User | null) => {
          this.user = user;
          this.profileForm = this.initForm(user);
        })
      )
      .subscribe();
  }

  private initForm(user: User | null): FormGroup {
    return this.fb.group({
      displayName: this.fb.control(user ? user.displayName : ''),
      photoURL: this.fb.control(user ? user.photoURL : ''),
      email: this.fb.control({ value: user ? user.email : '', disabled: true }),
    });
  }

  async saveUserCredentials(): Promise<void> {
    this.authService
      .updateUserProfile(this.profileForm.value)
      .then((res) => console.log(res));
  }
}
