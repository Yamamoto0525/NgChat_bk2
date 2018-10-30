import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Comment } from '../../class/chat';

export enum ChatActionTypes {
  LoadChats = '[Chat] Load Chats',
  LoadChatSuccess = '[Chat] Load Chats Success',
  LoadChatsFail = '[Chat] Load Chats Fail',
  AddChat = '[Chat] Add Chat',
  UpdateChat = '[Chat] Update Chat',
  DeleteChat = '[Chat] Delete Chat',
  WriteChatSuccess = '[Chat] Write Chat Success',
  WriteChatChatFail = '[Chat] Write Chat Fail'
}

export class LoadChats implements Action {
  readonly type = ChatActionTypes.LoadChats;

  constructor(public payload: { chats: Comment[] }) {}
}

export class LoadChatsSuccess implements Action {
  readonly type = ChatActionTypes.LoadChatSuccess;

  constructor(public payload: { chats: Comment[] }) {}
}

export class LoadChatsFail implements Action {
  readonly type = ChatActionTypes.LoadChatsFail;

  constructor(public payload?: { error: any }) {}
}

export class AddChat implements Action {
  readonly type = ChatActionTypes.AddChat;

  constructor(public payload: { chat: Comment }) {}
}

export class UpdateChat implements Action {
  readonly type = ChatActionTypes.UpdateChat;

  constructor(public payload: { chat: Update<Comment> }) {}
}

export class DeleteChat implements Action {
  readonly type = ChatActionTypes.DeleteChat;

  constructor(public payload: { id: string }) {}
}

export class WriteChatSuccess implements Action {
  readonly type = ChatActionTypes.WriteChatSuccess;

  constructor(public payload?: { chats: Comment[] }) {}
}

export class WriteChatChatFail implements Action {
  readonly type = ChatActionTypes.WriteChatChatFail;

  constructor(public payload?: { error: any }) {}
}

export type ChatActions =
  LoadChats
  | LoadChatsSuccess
  | LoadChatsFail
  | AddChat
  | UpdateChat
  | DeleteChat
  | WriteChatSuccess
  | WriteChatChatFail;
