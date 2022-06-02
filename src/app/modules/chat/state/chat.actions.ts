export class ChatAction {
  static readonly type = '[Chat] Add item';
  constructor(public payload: string) {}
}
