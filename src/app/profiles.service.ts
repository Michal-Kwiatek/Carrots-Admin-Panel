import { Injectable } from '@angular/core';
import { Rabbit } from './rabbit'

@Injectable()
export class ProfilesService {
  constructor() { }

  createNewProfile(name: string, count: number): void {

    let newProfile: Rabbit = {
      name: name,
      carrotsCount: count
    }

    let profilesInStorage: Array<Rabbit> = this.getProfiles();
    
    profilesInStorage.push(newProfile);

    localStorage.setItem("profiles", JSON.stringify(profilesInStorage));
  }

  getProfiles(): Array<Rabbit> {
    let profilesInStorage = JSON.parse(localStorage.getItem('profiles'));
    if (!profilesInStorage) { profilesInStorage = [] };

    return profilesInStorage;
  }


}



