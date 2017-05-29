import { CoutingSortPipe } from './couting-sort.pipe';
import { Rabbit } from './rabbit.interface';

function fillTable(count: number): Array<Rabbit> {
  let elements: Array<Rabbit> = [];

  while (elements.length < count) {
    elements.push({
      name: Math.random().toString(34).slice(2),
      carrotsCount: Math.round(Math.random() * 10000)
    })
  }
  
  return elements;
}


describe('CoutingSortPipe', () => {
  var elementsCount: number = 20000,  
      elements: Array<Rabbit> = fillTable(elementsCount),
      pipe = new CoutingSortPipe(),
      sorted: Array<Rabbit>;
  
 
  it(`Elements count before sorting should be ${elementsCount}`, () => {
    expect(elements.length).toBe(elementsCount)
  });

  it('Sorting time should be less than 10s', () => {
    var startTime: number = new Date().getTime();

    sorted = pipe.transform(elements);

    var endTime: number = new Date().getTime();
    var elapsedTime: number = (endTime-startTime) / 1000;
    
    console.info(`Sorting time: ${elapsedTime}s`);
    expect(elapsedTime).toBeLessThan(10);
  });

  it(`Elements count after sorting should be ${elementsCount}`, () => {
    expect(sorted.length).toBe(elementsCount)
  });

  it('Each next element carrots count number should be equal or less', () => {
    let sortingWorks: boolean = true;
    
    for(let i = 0; i < sorted.length-1; i++) {
      if(sorted[i].carrotsCount < sorted[i+1].carrotsCount) {
        sortingWorks = false;
      }
    }

    expect(sortingWorks).toBe(true);
  });

});
