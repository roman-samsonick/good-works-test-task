import { IWithId } from "./common.interfaces";

export interface ICreateActionDto {
  readonly name: string;
  readonly description: string;
}

export interface IUpdateActionDto {
  readonly name?: string;
  readonly description?: string;
  readonly completed?: boolean;
}

export interface IAction extends IWithId {
  readonly name: string;
  readonly description: string;
  readonly completed: boolean;
}
