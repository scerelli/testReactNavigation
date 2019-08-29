import { ICommand } from 'core/types';

export interface INavigationManager {
  navigateTo(uri: string, data?: object): void;
  goBack(): void;
  goBackTo(uri: string): void;
  restore(uri: string, data?: object): void;
  replace(uri: string, data?: object): void;
}

export interface INavigationLifecycle {
  onPostNavigate(uri: string, action: ICommand): void;
}

export interface IReactNavigationRef {
  setRouterRef(ref: any): void;
}
