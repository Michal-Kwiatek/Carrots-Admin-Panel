import { Component } from '@angular/core';
import { Rabbit } from './rabbit.interface'
import { ProfilesService } from './profiles.service';

@Component({
  selector: 'edit-profile',
  template: `
     <div class="card">
      <h3 class="card-header text-center">{{ title }}</h3>
      <div class="card-block">
        <label for="selectProfile">Profile: </label>
        <select name="profiles" id="selectProfile" [(ngModel)] = "selectedProfile">
          <option *ngFor="let profile of profiles" value="profile">{{profile.name}}</option>
        </select>
        <div *ngIf="selectedProfile">
          <p>Carrots count: {{ selectedProfile.carrotsCount }}</p>
          <button class="btn btn-danger">Delete profile</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent{
    profiles: Array<Rabbit>;
    title = "Edit";
    selectedProfile;

  constructor(private profilesService: ProfilesService) { 
      profilesService.getProfilesStream()
      .subscribe( profiles => {
        this.profiles = profiles.slice(0);
      })
  }


}
