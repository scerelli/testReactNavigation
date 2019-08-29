import { ICommand } from 'core/types';
import { INavigationManager, INavigationLifecycle } from './INavigationManager';

export class DeepLinkNavigationManager implements INavigationManager, INavigationLifecycle {
  private navigationManager: INavigationManager & INavigationLifecycle;

  constructor(navigationManager: INavigationManager & INavigationLifecycle) {
    this.navigationManager = navigationManager;
  }

  navigateTo(uri: string, data: object): void {
    const uriParts = uri.split('/');
    uriParts.forEach((part) => {
      const pageData = uriParts.length === 1 ? data : data && data[part];
      this.navigationManager.navigateTo(part, pageData);
    });
  }

  goBack(): void {
    this.navigationManager.goBack();
  }

  goBackTo(uri: string): void {
    this.navigationManager.goBackTo(uri);
  }

  restore(uri: string, data: object): void {
    this.navigationManager.restore(uri, data);
  }

  replace(uri: string, data: object): void {
    this.navigationManager.replace(uri, data);
  }

  onPostNavigate(uri: string, action: ICommand): void {
    this.navigationManager.onPostNavigate(uri, action);
  }
}
