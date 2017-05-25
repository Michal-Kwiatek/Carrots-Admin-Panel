import { Component } from '@angular/core';
import { ProfilesService } from './profiles.service';


@Component({
  selector: 'new-profile',
  template: `
    <div class="card createProfile">
      <h3 class="card-header">Create new profile</h3>
      <form class="card-block" #profileForm="ngForm" (ngSubmit)="createProfile(profileForm)">
        <div class="formRow">
          <label for="rabbitName">Rabbit name: </label>
          <input type="text" name="rabbitName" required minlength="3" maxlength="18" [(ngModel)]="rabbitName" id="rabbitName">
        </div>
        <div class="formRow">
          <label for="carrotsCount">Carrots count: </label>
          <input type="number" name="carrotsCount" pattern="[0-9]{1,5}" required [(ngModel)]="carrotsCount" id="carrotsCount">
        </div>
        <input type="submit" [disabled]="!isFormValid(profileForm)" class="btn btn-success" value="Create">
      </form>
    </div>
  `,
  styleUrls: ['./new-profile.component.scss']
})

export class NewProfileComponent {
  constructor(private profilesService: ProfilesService) { }
  
  rabbitName: string;
  carrotsCount: number;

  
  isFormValid(form): boolean {
    return form.valid;
  }

  createProfile(form): void {
    this.profilesService.createNewProfile(this.rabbitName, this.carrotsCount);

    alert(`Success! Created rabbit ${this.rabbitName} with ${this.carrotsCount} carrots`) 
    form.reset();
  }

}
