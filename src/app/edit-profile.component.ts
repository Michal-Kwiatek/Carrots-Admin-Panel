import { Component } from '@angular/core';
import { Rabbit } from './rabbit.interface'
import { ProfilesService } from './profiles.service';

@Component({
  selector: 'edit-profile',
  template: `
     <div class="card">
      <h3 class="card-header">
        Edit<span *ngIf="selectedProfile">ing: {{ selectedProfile.name }}</span>     
      </h3>
      <div class="card-block">
        <label for="selectProfile">Profile: </label>
        <select name="profiles" id="selectProfile" [(ngModel)] = "selectedProfile">
          <option *ngFor="let profile of profiles" [ngValue]="profile" >{{profile.name}}</option>
        </select>
        <div *ngIf="selectedProfile">
          <p>Carrots count: {{ selectedProfile.carrotsCount }}</p>
          <button (click)="deleteProfile()" class="btn btn-danger">Delete profile</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent{
    profiles: Array<Rabbit>;
    selectedProfile: Rabbit;

  constructor(private profilesService: ProfilesService) { 
      profilesService.getProfilesStream()
      .subscribe( profiles => {
        this.profiles = profiles.slice();
      })
  }

  deleteProfile(): void {
    this.profilesService.deleteProfile(this.selectedProfile);
  }
}
