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
    this.savePushProfiles();
  }
  

  getProfilesStream(): Observable< Array<Rabbit> > {                  // RETURNS OBSERVABLE FOR PROFILES STREAM,
    return this.profilesStream.startWith( this.loadProfiles() );          // AT INITIAL SUBSCRIBE SENDING PROFIELS FROM STORAGE
  }


  savePushProfiles(profiles: Array<Rabbit> = this.profiles): void {          // SAVEING PROFILES TO THE LOCALSTORAGE AND PUSHING TO THE STREAM
    localStorage.setItem("profiles", JSON.stringify(profiles));
    this.profilesStream.next(profiles);
  }
  

  deleteProfile(profile: Rabbit): void {
    let index: number = this.getProfileIndex(profile);            // DELETING SPECIFIC PROFILE, SAVING AND PUSHING UPDATED
    this.profiles.splice(index, 1);                                   // PROFILES ARRAY

    this.savePushProfiles();
  }


  loadProfiles(): Array<Rabbit> {
    let profilesInStorage = JSON.parse(localStorage.getItem('profiles'));
    if (!profilesInStorage) { profilesInStorage = [] };                      // RETURNS PROFILES FROM LOCALSTORAGE

    return profilesInStorage;
  }
  
  getProfileIndex(profile: Rabbit): number {                  // RETURNS INDEX IN PROFILES ARRAY OF PROVIDED PROFILE, LESS STRICT THAN .INDEXOF()
    for(let index in this.profiles) {
      if(profile.name == this.profiles[index].name && profile.carrotsCount == this.profiles[index].carrotsCount ) {
        return parseInt(index);
      }
    }
  }

  addSubtractCarrots(profile: Rabbit, count: number): number {
    let index: number = this.getProfileIndex(profile);           // SUBTRACTING OR ADDING NEW CARROTS WITH MIN AND MAX COUNT,
    let target: Rabbit = this.profiles[index];                    // RETURNS INDEX OF EDITED PROFILE
    
    target.carrotsCount += count;

    if(target.carrotsCount < 0) { target.carrotsCount = 0 }
    else if (target.carrotsCount > 99999 ) {
      target.carrotsCount = 99999;  
    } 
  
    this.savePushProfiles();

    return index;
  }


}



