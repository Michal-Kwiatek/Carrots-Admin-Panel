# CarrotPanel

* Each profile require name(3-18 chars) and count of carrots(max 5 numbers).
* Profiles are saved to both, LocalStorage and app cache to speed up operations. (they're executed on cached array and then saved to local storage).
* To sort table in real time i have used pipe. (sorting time is logged to console in unit tests).
* You can modify buttons (responsible for adding/subtracting carrots) in profiles.service file.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

If `ng command` don't work just add `npm run` before e.g. `npm run ng serve`

## Development server

Run `ng serve`  for a dev server. Navigate to `http://localhost:4200/`. 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

