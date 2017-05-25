import { Pipe, PipeTransform } from '@angular/core';
import { Rabbit } from './rabbit'

@Pipe({
  name: 'coutingSort'
})
export class CoutingSortPipe implements PipeTransform {

  transform(profiles: Array<Rabbit>): Array<Rabbit> {

    let countTable = [];
    for (let i = 0; i < profiles.length; i++) {
      if (countTable[profiles[i].carrotsCount] === undefined) {
        countTable[profiles[i].carrotsCount] = 1;
      } else {
        countTable[profiles[i].carrotsCount]++;
      }
    }

    let sortedTable = [];
    for (let j = 0; j < countTable.length; j++) {
      if (countTable[j] !== undefined) {
        for (let k = 1; k <= countTable[j]; k++) {
          for (let profile of profiles) {
            if (profile.carrotsCount == j && k == 1) {
              sortedTable.push(profile)
            }
          }
        }
      }
    }

    return sortedTable.reverse();
  }
}
