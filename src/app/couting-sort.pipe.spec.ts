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
      pipe: CoutingSortPipe;
  
  beforeEach( () => {
    pipe = new CoutingSortPipe();
  })
  
  it(`elements count before sort should be ${elementsCount}`, () => {
    expect(elements.length).toBe(elementsCount)
  })
  
  it(`elements count after sort should be ${elementsCount}`, () => {
    var sorted = pipe.transform(elements);
    expect(sorted.length).toBe(elementsCount)
  })

  it('sorting time should be less than 10s', () => {
    var date = new Date();
    var startTime: number = date.getTime();

    var sorted: Array<Rabbit> = pipe.transform(elements);

    date = new Date();
    var endTime: number = date.getTime();
    var elapsedTime: number = (endTime-startTime) / 1000;
    
    console.info(`Sorting time: ${elapsedTime}s`);
    expect(elapsedTime).toBeLessThan(10);
  });
});
