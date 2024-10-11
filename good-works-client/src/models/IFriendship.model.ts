import { IUser } from '@/models/IUser.model';

export interface IFriendship {
  readonly id: number;
  readonly from: number;
  readonly to: number;
  pending: boolean;
}

export interface IFriendshipsWithRelatedUsers {
  friendships: IFriendship[];
  relatedUsers: IUser[];
}
