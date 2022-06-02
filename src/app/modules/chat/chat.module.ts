import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ChatSearchComponent } from './components/chat-search/chat-search.component';
import { ChatSidebarChannelComponent } from './components/chat-sidebar-channel/chat-sidebar-channel.component';
import { ChatPaneHeadComponent } from './components/chat-pane-head/chat-pane-head.component';
import { ChatPaneContentComponent } from './components/chat-pane-content/chat-pane-content.component';
import { ChatPaneFooterComponent } from './components/chat-pane-footer/chat-pane-footer.component';

@NgModule({
  declarations: [
    ChatComponent,
    ChatSearchComponent,
    ChatSidebarChannelComponent,
    ChatPaneHeadComponent,
    ChatPaneContentComponent,
    ChatPaneFooterComponent,
  ],
  imports: [CommonModule, ChatRoutingModule],
})
export class ChatModule {}
