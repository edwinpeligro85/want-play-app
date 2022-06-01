import { CreatePostDto, UpdatePostDto } from '@app/api/models';

export namespace Posts {
  export class Add {
    static readonly type = '[Posts] Add';
    constructor(public payload: CreatePostDto) {}
  }

  export class Edit {
    static readonly type = '[Posts] Edit';
    constructor(public id: string, public payload: UpdatePostDto) {}
  }

  export class FetchAll {
    static readonly type = '[Posts] Fetch All';

    constructor(
      public payload?: {
        filter?: string;
        sort?: string;
        limit?: number;
      }
    ) {}
  }

  export class Delete {
    static readonly type = '[Posts] Delete';
    constructor(public id: string) {}
  }

  export class SendRequest {
    static readonly type = '[Posts] Send Request';
    constructor(public id: string) {}
  }

  export class SetFilter {
    static readonly type = '[Posts] Set Filter';
    constructor(public filter: string) {}
  }
}
