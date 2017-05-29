import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ButtonsGroupComponent } from './buttons-group.component';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { Rabbit } from './rabbit.interface';
import { ProfilesService } from "./profiles.service";
import { EditProfileComponent } from './edit-profile.component';


describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  let de: DebugElement;
  let profileService: ProfilesService;
  
  let profilesArr: Array<Rabbit> =  [ 
    {
      name: "test",
      carrotsCount: 42
    },
    {
      name: "anotherGreatTest",
      carrotsCount: 98
    }
  ];
  let buttonsArr = [[5,10,15],[20,22,12]];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations : [EditProfileComponent, ButtonsGroupComponent],
      providers: [ProfilesService]
    });

    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    profileService = TestBed.get(ProfilesService);
    profileService.profiles = profilesArr.slice();
  });
    

  it('should load profiles from stream', () => {
    spyOn(profileService, "getProfilesStream")
      .and.returnValue(Observable.of(profilesArr));

    fixture.detectChanges();
    expect(component.profiles).toEqual(profilesArr);
  });

  it('should get buttons setup from service', () => {
    spyOn(profileService, "getButtons")
      .and.returnValue(buttonsArr);
    
    fixture.detectChanges();
    expect(component.buttonsSetup).toEqual(buttonsArr);
  });

  it('should remove selected profile', () => {
    component.selectedProfile = profilesArr[0];
    fixture.detectChanges();

    component.deleteProfile();
    expect(component.profiles.length).toBe(profilesArr.length-1)
  });

  
  it('should dispaly carrots count of selected profile', () => {
    component.selectedProfile = profilesArr[1];
    fixture.detectChanges();

    const el = de.query(By.css('p')).nativeElement;

    expect(el.textContent).toContain(component.selectedProfile.carrotsCount);
  });
    

  it('should add 5 carrots', () => {
    component.selectedProfile = profilesArr[0];
    fixture.detectChanges();
    
    let carrotsBefore = component.selectedProfile.carrotsCount;
    component.addRemoveCarrots(5);
    expect(component.selectedProfile.carrotsCount).toBe(carrotsBefore + 5);
  });
    
  it('should subtract 5 carrots', () => {
    component.selectedProfile = profilesArr[1];
    fixture.detectChanges();
    
    let carrotsBefore = component.selectedProfile.carrotsCount;
    component.addRemoveCarrots(-5);
    expect(component.selectedProfile.carrotsCount).toBe(carrotsBefore - 5);
  });
});
