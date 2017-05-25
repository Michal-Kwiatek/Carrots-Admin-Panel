import { Injectable } from '@angular/core';
import { Rabbit } from './rabbit';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ProfilesService {
  constructor() { }
  
  profilesStream: Subject< Array<Rabbit> > = new Subject();

  createNewProfile(name: string, count: number): void {
    
    let newProfile: Rabbit = {
      name: name,
      carrotsCount: count
    }

    let profilesInStorage: Array<Rabbit> = this.loadProfiles();
    profilesInStorage.push(newProfile);
    
    this.saveProfiles(profilesInStorage);
    this.profilesStream.next(profilesInStorage);
  }
  
  getProfilesStream(): Observable< Array<Rabbit> > {
    return this.profilesStream.startWith( this.loadProfiles() );
  }

  saveProfiles(profiles: Array<Rabbit>): void {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }

  loadProfiles(): Array<Rabbit> {
    let profilesInStorage = JSON.parse(localStorage.getItem('profiles'));
    if (!profilesInStorage) { profilesInStorage = [] };

    return profilesInStorage;
  }


}



