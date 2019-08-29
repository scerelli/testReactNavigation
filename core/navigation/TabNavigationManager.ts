export interface ITabNavigationManager {
  goToTab: (tabKey: string) => void;
}

export interface ITabViewManager {
  jumpTo?: (tabKey: string) => void;
}

export class TabNavigationManager implements ITabNavigationManager {
  private tabNavigationManager: ITabViewManager;

  constructor(tabNavigationManager: ITabViewManager) {
    this.tabNavigationManager = tabNavigationManager;
  }

  goToTab(tabKey: string): void {
    if (!this.tabNavigationManager.jumpTo) {
      throw new Error('This Scene is not part of a Tabs.');
    }

    this.tabNavigationManager.jumpTo(tabKey);
  }
}
