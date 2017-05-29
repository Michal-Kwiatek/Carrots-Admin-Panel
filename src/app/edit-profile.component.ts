import { Component, OnInit } from '@angular/core';
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
          <buttons-group [buttons]="buttonsSetup"
          (buttonClicked)="addRemoveCarrots($event)"></buttons-group>
          <button (click)="deleteProfile()" class="btn btn-danger">Delete profile</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profiles: Array<Rabbit>;
  selectedProfile: Rabbit;
  buttonsSetup: Array<any>;

  constructor(private profilesService: ProfilesService) { }

  getProfiles(): void {
    this.profilesService.getProfilesStream()
      .subscribe(profiles => {
        this.profiles = profiles.slice();        // UPDATING PROFILES LIST WHEN NEW PROFILES ARRAY APPEARS IN STREAM

        if (!this.selectedProfile && profiles.length) {
          this.selectedProfile = profiles[0];
        }
      })
  }

  addRemoveCarrots(value: number): void {
    let index = this.profilesService.addSubtractCarrots(this.selectedProfile, value);
    this.selectedProfile = this.profiles[index];          // WITHOUT THIS RESELECT, AFTER ADD/SUBTRACT OPERATION, 
  }                                                         // PROFILE SELECOTR NO LONGER DISPLAYS SELECTED PROFILE 
  

  deleteProfile(): void {
    this.profilesService.deleteProfile(this.selectedProfile);
    this.selectedProfile = this.profiles[0];
  }
  
  ngOnInit() {
     this.getProfiles();
     this.buttonsSetup = this.profilesService.getButtons();  // LOADING BUTTON GROUP SETUP FROM SERVICE
  }

}
