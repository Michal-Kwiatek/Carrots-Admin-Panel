import { Injectable } from '@angular/core';
import { Rabbit } from './rabbit.interface';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ProfilesService {
  profiles: Array<Rabbit>
  profilesStream: Subject< Array<Rabbit> > = new Subject();

  constructor() {
    this.profiles = this.loadProfiles();       // LOAD PROFILES FROM LOCALSTORAGE ON APP START
  }
  
  plusButtons: Array<string> = ['+1', '+5', '+15', '+30', '+50', '+100'];    // YOU CAN SETUP HERE HOW MANY BUTTONS TO MANIPULATE
  minusButtons: Array<string> = ['-1', '-5', '-15', '-30', '-50', '-100']      // CARROTS COUNT NUMBER YOU WANT
  
  getButtons(): Array<any> {
    return [this.plusButtons, this.minusButtons];  
  }

  createNewProfile(name: string, count: number): void {
    
    let newProfile: Rabbit = {
      name: name,                        // CREATING NEW PROFILE, SAVING TO THE LOCALSTORAGE AND PUSHING UPDATED                                       
      carrotsCount: count                  // PROFILES ARRAY TO THE STREAM 
    }

    this.profiles.push(newProfile);
   
    this.saveProfiles();
    this.profilesStream.next(this.profiles);
  }
  

  getProfilesStream(): Observable< Array<Rabbit> > {                  // RETURNING OBSERVABLE STREAM TO SUBSCRIBE,
    return this.profilesStream.startWith( this.loadProfiles() );          // AT FIRST SUBSCRIBE SENDING PROFIELS FROM STORAGE
  }


  saveProfiles(profiles: Array<Rabbit> = this.profiles): void {          // SAVE PROFILES TO THE LOCALSTORAGE
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }
  

  deleteProfile(profile: Rabbit) {
    let index: number = this.profiles.indexOf(profile);            // DELETING SPECIFIC PROFILE, SAVING AND PUSHING UPDATED
    this.profiles.splice(index, 1);                                   // PROFILES ARRAY

    this.saveProfiles();
    this.profilesStream.next(this.profiles);
  }


  loadProfiles(): Array<Rabbit> {
    let profilesInStorage = JSON.parse(localStorage.getItem('profiles'));
    if (!profilesInStorage) { profilesInStorage = [] };                      // LOAD PROFILES FROM LOCALSTORAGE

    return profilesInStorage;
  }


}



