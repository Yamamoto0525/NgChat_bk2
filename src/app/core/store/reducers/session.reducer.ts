import { Session } from '../../../class/chat';
import { SessionActions, SessionActionTypes } from '../actions/session.actions';

/**
 * State
 */

export interface State {
  loading: boolean;
  session: Session;
}

export const initialState: State = {
  loading: false,
  session: new Session()
};

/**
 * Reducer
 */

export function reducer(
  state = initialState,
  action: SessionActions
): State {
  switch (action.type) {
    case SessionActionTypes.LoadSessions: {
      return { ...state, loading: true };
    }
    case SessionActionTypes.LoadSessionsSuccess: {
      return { ...state, loading: false, session: action.payload.session };
    }
    case SessionActionTypes.LoadSessionsFail: {
      return { ...state, loading: false };
    }
    case SessionActionTypes.UpdateSessions: {
      return { ...state, loading: true, session: action.payload.auth };
    }
    case SessionActionTypes.UpdateSessionsSuccess: {
      return { ...state, loading: false, session: action.payload.session };
    }
    case SessionActionTypes.UpdateSessionsFail: {
      return { ...state, loading: false };
    }
    case SessionActionTypes.LogoutSessions: {
      return { ...state, loading: true};
    }
    case SessionActionTypes.LogoutSessionsSuccess: {
      return { ...state, loading: false, session: action.payload.session };
    }
    case SessionActionTypes.LogoutSessionsFail: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
}

/**
 * Selectors
 */

export const getSessionLoading = (state: State) => state.loading;
export const getSessionData = (state: State) => state.session;
