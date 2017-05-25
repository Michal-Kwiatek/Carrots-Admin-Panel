import { Injectable } from '@angular/core';
import { Rabbit } from './rabbit'

@Injectable()
export class ProfilesService {
  constructor() { }
  
  createNewProfile(name: string, count: number) {

    let newRabbit: Rabbit = {
      name: name,
      carrotsCount: count
    }

    let profilesInStorage:Array<object> = JSON.parse(localStorage.getItem('profiles'));

    if(!profilesInStorage) { profilesInStorage = [] };


    profilesInStorage.push(newRabbit);

    localStorage.setItem("profiles", JSON.stringify(profilesInStorage));
  }

}
