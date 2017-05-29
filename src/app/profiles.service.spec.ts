import { Observable } from 'rxjs';
import { ProfilesService } from './profiles.service';

describe('ProfilesService', () => {
    var service: ProfilesService;

    beforeEach(() => {
        service = new ProfilesService();   
    });
    
    it('should return observable', () => {
        let obs = service.getProfilesStream();
        expect(obs).toEqual(jasmine.any(Observable));
    });
    
    
    it('should create new profile', () => {
        service.profiles = [];
        service.createNewProfile("test", 1);

        expect(service.profiles.length).toBe(1);
    });

    
    it('should delete profile', () => {
        let profile = {
            name: "test",
            carrotsCount: 15
        }
        service.profiles = [profile];
        service.deleteProfile(profile)

        expect(service.profiles.length).toBe(0);
    });

    it('should find provided profile', () => {
        let profile1 = {
            name: "test1",
            carrotsCount: 15
        }

        let profile2 = {
            name: "test2",
            carrotsCount: 5
        }

        service.profiles = [profile1, profile2];    
        expect(service.getProfileIndex(profile2)).toBe(1);
    });
        
        
});
