import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ChatActions, ChatActionTypes } from './chat.actions';
import { Comment } from '../../class/chat';

export interface State extends EntityState<Comment> {
  loading: boolean;
}

export const adapter: EntityAdapter<Comment> = createEntityAdapter<Comment>();

export const initialState: State = adapter.getInitialState({
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
      return { ...adapter.updateOne(action.payload.chat, state), loading: true };
    }

    case ChatActionTypes.DeleteChat: {
      return { ...adapter.removeOne(action.payload.id, state), loading: true };
    }

    case ChatActionTypes.LoadChats: {
      return { ...state, loading: true };
    }

    case ChatActionTypes.LoadChatSuccess: {
      return { ...adapter.upsertMany(action.payload.chats, state), loading: false };
    }

    case ChatActionTypes.LoadChatsFail: {
      return { ...state, loading: false };
    }

    case ChatActionTypes.WriteChatSuccess: {
      return { ...state, loading: false };
    }

    case ChatActionTypes.WriteChatChatFail: {
      return { ...state, loading: false };
    }

    default: {
      return state;
    }
  }
}

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
export const selectChat = createFeatureSelector<State>('chat');
export const getChatLoading = createSelector(selectChat, state => state.loading);
export const selectAllChats = createSelector(selectChat, selectAll);
