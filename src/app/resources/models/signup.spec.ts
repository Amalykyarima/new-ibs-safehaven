import { IndividualSignupWithID, IndividualSignupWithPhone } from './signup';

describe('Signup', () => {
  it('should create an instance', () => {
    expect(new IndividualSignupWithID()).toBeTruthy();
  });
  it('should create an instance', () => {
    expect(new IndividualSignupWithPhone()).toBeTruthy();
  });
});
