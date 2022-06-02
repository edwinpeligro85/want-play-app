import { CreateMessageDto, Message } from '@app/api/models';

export namespace Chat {
  export class FetchAll {
    static type = '[Chat] FetchAll chats';
  }

  export class Open {
    static type = '[Chat] Open chat';
    constructor(public id: string) {}
  }

  export class Add {
    static type = '[Chat] Add message';
    constructor(public message: Message) {}
  }

  export class Create {
    static type = '[Chat] Create message';
    constructor(public payload: CreateMessageDto) {}
  }
}
