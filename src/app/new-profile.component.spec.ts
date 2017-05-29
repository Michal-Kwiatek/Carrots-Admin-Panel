import { By } from '@angular/platform-browser/';
import { FormsModule } from '@angular/forms';
import { ProfilesService } from './profiles.service';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProfileComponent } from './new-profile.component';

describe('NewProfileComponent', () => {
  let component: NewProfileComponent;
  let fixture: ComponentFixture<NewProfileComponent>;
  let de: DebugElement;
  let profileService: ProfilesService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      declarations : [NewProfileComponent],
      providers: [ProfilesService]
    });

    fixture = TestBed.createComponent(NewProfileComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    profileService = TestBed.get(ProfilesService);
  });
    

  it('should fail validation when carrots count is less than 0', async(() => {
    component.carrotsCount = -20;
    component.rabbitName = "valid";
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const form = de.query(By.css("form")).nativeElement;
      fixture.detectChanges();
      expect(form.classList.contains('ng-invalid')).toBeTruthy();
    })
  }));

  it('should fail validation when carrots count is float number', async(() => {
    component.carrotsCount = 1.5;
    component.rabbitName = "valid";
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const form = de.query(By.css("form")).nativeElement;
      fixture.detectChanges();
      expect(form.classList.contains('ng-invalid')).toBeTruthy();
    })
  }));
    
  it('should fail validation when name is empty', async(() => {
    component.carrotsCount = 5;
    component.rabbitName = undefined;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const form = de.query(By.css("form")).nativeElement;
      fixture.detectChanges();
      expect(form.classList.contains('ng-invalid')).toBeTruthy();
    })
  }));

  it('should fail validation when carrots count is empty', async(() => {
    component.carrotsCount = undefined;
    component.rabbitName = "valid";
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const form = de.query(By.css("form")).nativeElement;
      fixture.detectChanges();
      expect(form.classList.contains('ng-invalid')).toBeTruthy();
    })
  }));
  
  it('should fail validation when name is shorter than 3 chars', async(() => {
    component.carrotsCount = 15;
    component.rabbitName = "va";
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const form = de.query(By.css("form")).nativeElement;
      fixture.detectChanges();
      expect(form.classList.contains('ng-invalid')).toBeTruthy();
    })
  }));

  it('should pass validation when inputs are filled properly', async(() => {
    component.carrotsCount = 5;
    component.rabbitName = "valid";
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const form = de.query(By.css("form")).nativeElement;
      fixture.detectChanges();
      expect(form.classList.contains('ng-invalid')).toBeFalsy();
    })
  }));
});
