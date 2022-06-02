import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ChatState } from './chat.state';
import { ChatAction } from './chat.actions';

describe('Chat actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ChatState])],
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    store.dispatch(new ChatAction('item-1'));
    store
      .select((state) => state.chat.items)
      .subscribe((items: string[]) => {
        expect(items).toEqual(jasmine.objectContaining(['item-1']));
      });
  });
});
