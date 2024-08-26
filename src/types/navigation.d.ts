import { ComponentType, Element } from 'react';

export interface IRoute {
  path: string;
  name: string;
  title?: string;
  layout?: string;
  exact?: boolean;
  component?: ComponentType;
  icon?: ComponentType | string | Element;
  secondary?: boolean;
  collapse?: boolean;
  items?: IRoute[];
  rightElement?: boolean;
  invisible?: boolean;
  disabled?: boolean;
  isPublic?: boolean;
}
