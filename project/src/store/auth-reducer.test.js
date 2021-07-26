import { authReducer } from './auth-reducer.js';
import { AuthorizationStatus } from '../const';
import { setAuthorizationStatus } from './action';

describe('Reducers: authReducer', () => {
  it('should return new state with status field set if called with set authorization status action', () => {
    const initialState = {
      status: AuthorizationStatus.UNKNOWN,
    };

    const authState = {
      status: AuthorizationStatus.AUTH,
    };

    const noAuthState = {
      status: AuthorizationStatus.NO_AUTH,
    };

    expect(authReducer(initialState, setAuthorizationStatus(AuthorizationStatus.AUTH))).toEqual(authState);
    expect(authReducer(initialState, setAuthorizationStatus(AuthorizationStatus.NO_AUTH))).toEqual(noAuthState);
  });

  it('should return unchanged state if called with incorrect action', () => {
    const state = {
      status: AuthorizationStatus.UNKNOWN,
    };

    const incorrectAction = {
      type: 'incorrect',
    };

    expect(authReducer(state, incorrectAction)).toEqual(state);
  });

});
