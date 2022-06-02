import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPaneFooterComponent } from './chat-pane-footer.component';

describe('ChatPaneFooterComponent', () => {
  let component: ChatPaneFooterComponent;
  let fixture: ComponentFixture<ChatPaneFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatPaneFooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPaneFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
