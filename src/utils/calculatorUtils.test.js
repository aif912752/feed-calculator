import { calculateResults } from './calculatorUtils';

describe('calculateResults', () => {
  it('should calculate results correctly for kg', () => {
    const result = calculateResults(50, 100, 200, 10, 'kg');
    expect(result.fcr).toBeCloseTo(4.00);
    expect(result.adg).toBeCloseTo(5.00);
    expect(result.fi).toBeCloseTo(20.00);
  });

  it('should calculate results correctly for g', () => {
    const result = calculateResults(50000, 100000, 200000, 10, 'g');
    expect(result.fcr).toBeCloseTo(4.00);
    expect(result.adg).toBeCloseTo(5000.00);
    expect(result.fi).toBeCloseTo(20000.00);
  });
});
