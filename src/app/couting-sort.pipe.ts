import { Pipe, PipeTransform } from '@angular/core';
import { Rabbit } from './rabbit.interface';

@Pipe({
  name: 'coutingSort'
})
export class CoutingSortPipe implements PipeTransform {

  transform(profiles: Array<Rabbit>): Array<Rabbit> {

    let countTable = [];
    for (let i in profiles) {
      if (countTable[profiles[i].carrotsCount] === undefined) {
        countTable[profiles[i].carrotsCount] = 1;                  // Couting how many times each carrots count number appers
      } else {
        countTable[profiles[i].carrotsCount]++;
      }
    }

    let sortedTable = [];
    for (let j = 0; j < countTable.length; j++) {
      if (countTable[j] !== undefined) {
        for (let k = 1; k <= countTable[j]; k++) {        // Sorting, pushing into sorted Array
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
