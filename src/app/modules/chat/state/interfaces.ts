import { Message } from '@app/api/models';

export interface MessagesGroup {
  date: string;
  messages: Message[];
}
