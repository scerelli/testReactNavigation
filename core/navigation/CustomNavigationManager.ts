import { INavigationManager, INavigationLifecycle } from 'core/navigation/INavigationManager';
import { RoutableNavigationManager, NavigationData } from 'core/navigation/RoutableNavigationManager';

export type CustomNavigationFlow = {
  current: string;
  next: string;
  params?: any;
}

export type CustomNavigator = {
  next(current: string): NavigationData;
};

export interface ICustomNavigation extends INavigationManager, INavigationLifecycle {
  configure(config: any): ICustomNavigation;
  navigateToNextView({ current }: { current: string}): void;
}

export abstract class CustomNavigation extends RoutableNavigationManager implements ICustomNavigation {
  navigator: CustomNavigator = null;

  constructor(navigationManager, routingStrategy) {
    super(navigationManager, routingStrategy);
  }

  abstract getNavigator(cfg: any): ICustomNavigation;

  configure(config) {
    this.getNavigator(config);
    return this;
  }

  navigateToNextView({ current }: { current: string }) {
    if (!this.navigator) {
      throw 'Should call configure method to get navigator';
    }
    const { path: nextView, params } = this.navigator.next(current);
    super.navigateTo(nextView, params);
  }
}
