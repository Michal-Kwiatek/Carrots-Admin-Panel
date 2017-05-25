import { Component } from '@angular/core';
import { ProfilesService } from './profiles.service';
import { Rabbit } from './rabbit'

@Component({
  selector: 'table-profiles',
  template: `
    <table class="table">
      <thead class="thead-inverse">
        <tr>
          <th>#</th>
          <th>Rabbit Name</th>
          <th>Carrots Count</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let profile of profiles | coutingSort; let i = index">
          <th scope="row">{{i+1}}</th>
          <td>{{profile.name}}</td>
          <td>{{profile.carrotsCount}}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    
  `]
})
export class TableProfilesComponent {
  
  profiles: Array<Rabbit>;

  constructor(private profilesService: ProfilesService) {
    
    profilesService.getProfilesStream()
      .subscribe( profiles => {
        this.profiles = profiles
      })
  }
  
}
