import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  it('create an instance', () => {
    const pipe = new DurationPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms 90 minutes to 1 h 30 min', () => {
      const pipe = new DurationPipe();
  
      expect(pipe.transform(90)).toEqual('1 h 30 min');
  });


  it('transforms 40 minutes to 40 min', () => {
    const pipe = new DurationPipe();

    expect(pipe.transform(40)).toEqual('40 min');
  });
});
