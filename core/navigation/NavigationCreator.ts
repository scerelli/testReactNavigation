import { INavigationCreator, Screens, NavigatorOptions } from './INavigationCreator';
import { IHistoryStackHolder } from './HistoryStackHolder';

export class NavigationCreator implements INavigationCreator {
  private navigator: any;
  private historyStackHolder: IHistoryStackHolder;

  constructor(navigator: any, backStackHandler: IHistoryStackHolder) {
    this.navigator = navigator;
    this.historyStackHolder = backStackHandler;
  }

  createStack(screens: {}, config = {}) {
    return this.navigator.createStackNavigator(screens, config);
  }

  create = (screens: Screens, navigatorConfig: NavigatorOptions = {}) => {
    const stack = this.navigator.createStackNavigator(screens, navigatorConfig);
    const defaultGetStateForAction = stack.router.getStateForAction;
    stack.router.getStateForAction = (action: any, state: any) => {
      if (state && action.type === 'Navigation/BACK' && action.immediate) {
        this.historyStackHolder.pop();
      }
      return defaultGetStateForAction(action, state);
    };
    return this.navigator.createAppContainer(stack);
  }
}
