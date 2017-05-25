import { Injectable } from '@angular/core';
import { Rabbit } from './rabbit.interface';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ProfilesService {
  profiles: Array<Rabbit>
  profilesStream: Subject< Array<Rabbit> > = new Subject();

  constructor() {
    this.profiles = this.loadProfilesFromStorage();
  }

  createNewProfile(name: string, count: number): void {
    
    let newProfile: Rabbit = {
      name: name,
      carrotsCount: count
    }

    this.profiles.push(newProfile);
    
    this.saveProfilesToStorage();
    this.profilesStream.next(this.profiles);
  }
  
  getProfilesStream(): Observable< Array<Rabbit> > {
    return this.profilesStream.startWith( this.loadProfilesFromStorage() );
  }

  saveProfilesToStorage(profiles: Array<Rabbit> = this.profiles): void {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }
  
  deleteProfile(profile: Rabbit) {
    let index: number = this.profiles.indexOf(profile);
    this.profiles.splice(index, 1);

    this.saveProfilesToStorage();
    this.profilesStream.next(this.profiles);
  }

  loadProfilesFromStorage(): Array<Rabbit> {
    let profilesInStorage = JSON.parse(localStorage.getItem('profiles'));
    if (!profilesInStorage) { profilesInStorage = [] };

    return profilesInStorage;
  }


}



