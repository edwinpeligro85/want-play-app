import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPaneContentComponent } from './chat-pane-content.component';

describe('ChatPaneContentComponent', () => {
  let component: ChatPaneContentComponent;
  let fixture: ComponentFixture<ChatPaneContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatPaneContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPaneContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
