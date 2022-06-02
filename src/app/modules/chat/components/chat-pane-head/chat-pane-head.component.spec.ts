import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPaneHeadComponent } from './chat-pane-head.component';

describe('ChatPaneHeadComponent', () => {
  let component: ChatPaneHeadComponent;
  let fixture: ComponentFixture<ChatPaneHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatPaneHeadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPaneHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
