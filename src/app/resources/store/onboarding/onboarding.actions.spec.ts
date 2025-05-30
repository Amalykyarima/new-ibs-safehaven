import * as fromOnboarding from './onboarding.actions';

describe('loadOnboardings', () => {
  it('should return an action', () => {
    expect(fromOnboarding.setUserType({userType: 'individual'}).type).toBe('[Onboarding] Set User Type');
  });
});
