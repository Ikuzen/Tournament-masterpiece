import * as fromLoginPage from './login-page.actions';

describe('loadLoginPages', () => {
  it('should return an action', () => {
    expect(fromLoginPage.loadLoginPages().type).toBe('[LoginPage] Load LoginPages');
  });
});
