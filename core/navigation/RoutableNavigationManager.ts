import { INavigationManager, INavigationLifecycle } from './INavigationManager';

export type NavigationData = {
  path: string;
  params?: object;
}

export class RoutableNavigationManager implements INavigationManager, INavigationLifecycle {
  private navigationManager: INavigationManager & INavigationLifecycle;

  constructor(
    navigationManager: INavigationManager & INavigationLifecycle,
  ) {
    this.navigationManager = navigationManager;
  }

  navigateTo(uri: string, data?: object): void {
    this.navigationManager.navigateTo(uri, data);
  }

  goBack(): void {
    this.navigationManager.goBack();
  }

  goBackTo(uri: string): void {
    this.navigationManager.goBackTo(uri);
  }

  restore(uri: string, data?: object): void {
    this.navigationManager.restore(uri, data);
  }

  replace(uri: string, data?: object): void {
    this.navigationManager.replace(uri, data);
  }

  onPostNavigate(uri: string, action: any): void {
    this.navigationManager.onPostNavigate(uri, action);
  }
}
