import { IWithId } from "./common.interfaces";
import { ILightUser } from "./user.interfaces";

export interface IFriendship extends IWithId {
  readonly from: number;
  readonly to: number;
  readonly pending: boolean;
}

export interface IFriendshipsWithRelatedUsers {
  readonly friendships: IFriendship[];
  readonly relatedUsers: ILightUser[];
}