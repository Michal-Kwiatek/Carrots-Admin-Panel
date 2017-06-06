import { Pipe, PipeTransform } from '@angular/core';
import { Rabbit } from './rabbit.interface';


// Little explanation
    // Each element in countTable contain array with indexes on which current element occurs in profiles Array.
    // We can get occurs count by cheking length of this array.

    // Example: profiles with carrots count = 52 appears twice in profiles array,
    // so instead of 'countTable[52] = 2' we got 'countTable[52] = [43,65]'
    // where '43' and '65' are indexes on which these profiles occurs in profiles Array,
    // countTable[52].length gives us 2 which is occurs count
    // by saving indexes I dont have to iterate through profilles array to find wanted profile


@Pipe({
  name: 'coutingSort'
})
export class CoutingSortPipe implements PipeTransform {

  transform(profiles: Array<Rabbit>): Array<Rabbit> {

    let countTable = [];
    for (let i in profiles) {
      if (countTable[profiles[i].carrotsCount] === undefined) {
        countTable[profiles[i].carrotsCount] = [i];             // Counting how many times each carrots count number occurs
      } else {
        countTable[profiles[i].carrotsCount].push(i);
      }
    }

    let index;
    let sortedTable = [];
    for (let j = 0; j < countTable.length; j++) {
      if (countTable[j] !== undefined) {
        for (let k = 1; k <= countTable[j].length; k++) {        // Sorting, pushing into sorted Array
          index = countTable[j][k - 1];
          sortedTable.push(profiles[index])
        }
      }
    }

    return sortedTable.reverse();
  }
}
