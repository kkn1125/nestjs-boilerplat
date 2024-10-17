import { capitalize } from './capitalize';

describe('capitalize test', () => {
  it('test 1', () => {
    const result = capitalize('Test WOW-asd_sadvnl(@#asdf)SDV GWEQRWE');
    expect(result).toStrictEqual('Test Wow-Asd_Sadvnl(@#Asdf)Sdv Gweqrwe');
  });
});
