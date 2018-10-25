import { Action } from '@ngrx/store';
import { Session } from '../../../class/chat';

export enum SessionActionTypes {
  LoadSessions = '[Session] Load',
  LoadSessionsSuccess = '[Session] Load Success',
  LoadSessionsFail = '[Session] Load Fail',
  UpdateSessions = '[Session] Update',
  UpdateSessionsSuccess = '[Session] Update Success',
  UpdateSessionsFail = '[Session] Update Fail',
  LogoutSessions = '[Session] Logout',
  LogoutSessionsSuccess = '[Session] Logout Success',
  LogoutSessionsFail = '[Session] Logout Fail',
}

export class LoadSessions implements Action {
  readonly type = SessionActionTypes.LoadSessions;
}

export class LoadSessionsSuccess implements Action {
  readonly type = SessionActionTypes.LoadSessionsSuccess;

  constructor(public payload: { session: Session }) {
  }
}

export class LoadSessionsFail implements Action {
  readonly type = SessionActionTypes.LoadSessionsFail;

  constructor(public payload?: { error: any }) {
  }
}

export class UpdateSessions implements Action {
  readonly type = SessionActionTypes.UpdateSessions;

  constructor(public payload: { auth: any }) {
  }
}

export class UpdateSessionsSuccess implements Action {
  readonly type = SessionActionTypes.UpdateSessionsSuccess;

  constructor(public payload: { session: Session }) {
  }
}

export class UpdateSessionsFail implements Action {
  readonly type = SessionActionTypes.UpdateSessionsFail;

  constructor(public payload?: { error: any }) {
  }
}

export class LogoutSessions implements Action {
  readonly type = SessionActionTypes.LogoutSessions;
}

export class LogoutSessionsSuccess implements Action {
  readonly type = SessionActionTypes.LogoutSessionsSuccess;

  constructor(public payload: { session: Session }) {
  }
}

export class LogoutSessionsFail implements Action {
  readonly type = SessionActionTypes.LogoutSessionsFail;

  constructor(public payload?: { error: any }) {
  }
}

export type SessionActions =
  | LoadSessions
  | LoadSessionsSuccess
  | LoadSessionsFail
  | UpdateSessions
  | UpdateSessionsSuccess
  | UpdateSessionsFail
  | LogoutSessions
  | LogoutSessionsSuccess
  | LogoutSessionsFail;
