import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ChatEffects } from './chat.effects';

describe('ChatEffects', () => {
  let actions$: Observable<any>;
  let effects: ChatEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChatEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ChatEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
