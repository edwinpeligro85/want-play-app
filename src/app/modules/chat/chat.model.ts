import { Chat } from '@app/api/models';
import { ProfileModel } from '../user/profile.model';

export class ChatModel implements Chat {
  _id: string = '';
  members: ProfileModel[] = [];
  createdAt: string = new Date().toJSON();
  updatedAt: string = new Date().toJSON();

  get isPeer(): boolean {
    return this.members.length <= 2;
  }

  get firstMember(): ProfileModel {
    return (
      this.members
        .filter((member) => member._id !== this._id)
        .slice(0, 1)
        .shift() ?? new ProfileModel()
    );
  }

  get membersNames(): string {
    return this.members.map((member) => member.nickname).join(', ');
  }

  get pic(): string {
    return this.isPeer ? this.firstMember.pic : 'assets/images/logo.png';
  }

  constructor(data: Partial<Chat> = {}) {
    Object.assign(this, data);

    if (data.members) {
      const members: ProfileModel[] = [];

      data.members.forEach((member) => members.push(new ProfileModel(member)));

      this.members = members;
    }
  }
}
