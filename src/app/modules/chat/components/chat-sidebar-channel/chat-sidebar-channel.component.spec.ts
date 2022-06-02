import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSidebarChannelComponent } from './chat-sidebar-channel.component';

describe('ChatSidebarChannelComponent', () => {
  let component: ChatSidebarChannelComponent;
  let fixture: ComponentFixture<ChatSidebarChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatSidebarChannelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSidebarChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
