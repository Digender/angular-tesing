import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  let sut;
  beforeEach(() => {
    sut = {};
  });

  it('should display weak if strength is 5', () => {
    const pipe = new StrengthPipe();
    const val = pipe.transform(5);
    console.log(val);
    expect(val).toEqual('5 (weak)');
  });

  it('should display weak if strength is 10', () => {
    const pipe = new StrengthPipe();
    const val = pipe.transform(10);
    console.log(val);
    expect(val).toEqual('10 (strong)');
  });
});
