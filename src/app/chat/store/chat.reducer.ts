import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Comment } from '../../class/chat';
import { ChatActions, ChatActionTypes } from './chat.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends EntityState<Comment> {
  loading: boolean;
}

export const chatAdapter: EntityAdapter<Comment> = createEntityAdapter<Comment>();

export const initialState: State = chatAdapter.getInitialState({
  loading: false,
});

export function reducer(
  state = initialState,
  action: ChatActions
): State {
  switch (action.type) {
    case ChatActionTypes.AddChat: {
      return { ...state, loading: true };
    }

    case ChatActionTypes.UpdateChat: {
      return { ...chatAdapter.updateOne(action.payload.chat, state), loading: true };
    }

    case ChatActionTypes.DeleteChat: {
      return { ...chatAdapter.removeOne(action.payload.id, state), loading: true };
    }

    case ChatActionTypes.LoadChats: {
      return { ...state, loading: true };
    }

    case ChatActionTypes.LoadChatSuccess: {
      return { ...chatAdapter.upsertMany(action.payload.chats, state), loading: false };
    }

    case ChatActionTypes.LoadChatsFail: {
      return { ...state, loading: false };
    }

    case ChatActionTypes.SuccessChat: {
      return { ...state, loading: false };
    }

    case ChatActionTypes.ErrorChat: {
      return { ...state, loading: false };
    }

    default: {
      return state;
    }
  }
}

/**
 * Selector
 */

const { selectIds, selectEntities, selectAll, selectTotal } = chatAdapter.getSelectors();
export const selectChat = createFeatureSelector<State>('chat');
export const getChatLoading = createSelector(selectChat, state => state.loading);
export const selectAllChats = createSelector(selectChat, selectAll);
