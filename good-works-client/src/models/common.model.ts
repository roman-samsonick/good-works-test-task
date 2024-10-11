import { MouseEvent } from 'react';

export interface IPropsWithClassname {
  className?: string;
}

export interface IClickHandler {
  onClick?: IValueCallback<MouseEvent>;
}

export interface IElementProps extends IPropsWithClassname, IClickHandler {
}

export interface ICallback {
  (): void;
}

export interface IValueCallback<T> {
  (value: T): void;
}
