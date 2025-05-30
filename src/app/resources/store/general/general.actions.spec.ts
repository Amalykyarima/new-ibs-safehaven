import * as fromGeneral from './general.actions';

describe('loadGenerals', () => {
  it('should return an action', () => {
    expect(fromGeneral.loadGenerals().type).toBe('[General] Load Generals');
  });
});
