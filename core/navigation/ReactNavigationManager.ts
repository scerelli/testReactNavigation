import { INavigationManager, INavigationLifecycle, IReactNavigationRef } from './INavigationManager';
import { IHistoryStackHolder } from './HistoryStackHolder';


export class ReactNavigationManager implements INavigationManager, INavigationLifecycle, IReactNavigationRef {
  private reactNavigationRef: any;
  private navigationActions: any;
  private reactNavigationStackActions: any;
  private postNavigateCommands: [string, any][] = [];
  private historyStackHolder: IHistoryStackHolder;

  constructor(
    reactNavigationStackActions: any,
    navigationActions: any,
    historyStackHolder: IHistoryStackHolder,
  ) {
    this.reactNavigationStackActions = reactNavigationStackActions;
    this.navigationActions = navigationActions;
    this.historyStackHolder = historyStackHolder;
  }

  setRouterRef = (ref: any) => {
    this.reactNavigationRef = ref;
  }

  navigateTo(routeName: string, params: object): void {
    this.reactNavigationRef.dispatch(
      this.navigationActions.navigate({
        routeName,
        params,
      }),
    );
    this.historyStackHolder.push(routeName);
    this.handlePostNavigate(routeName);
  }

  goBack(): void {
    this.reactNavigationRef.dispatch(
      this.reactNavigationStackActions.pop(),
    );
    this.historyStackHolder.pop();
  }

  goBackTo(routeName: string): void {
    let nToRoute = 0;

    while (true) {
      const poppedElement = this.historyStackHolder.pop();
      if (poppedElement === routeName) {
        this.historyStackHolder.push(routeName);
        break;
      } else if (this.historyStackHolder.size() === 1) {
        nToRoute += 1;
        break;
      }

      nToRoute += 1;
    }

    this.reactNavigationRef.dispatch(
      this.reactNavigationStackActions.pop({
        n: nToRoute,
      }),
    );
  }

  restore(routeName: string, data: object): void {
    this.reactNavigationRef.dispatch(
      this.reactNavigationStackActions.reset({
        index: 0,
        actions: [this.navigationActions.navigate({ routeName, params: data })],
      }),
    );
    this.historyStackHolder.clear();
    this.historyStackHolder.push(routeName);
    this.handlePostNavigate(routeName);
  }

  replace(routeName: string, data: object = {}): void {
    this.reactNavigationRef.dispatch(
      this.reactNavigationStackActions.replace({ routeName, params: data }),
    );
    this.historyStackHolder.pop();
    this.historyStackHolder.push(routeName);
    this.handlePostNavigate(routeName);
  }

  onPostNavigate(screenName: string, action: any): void {
    this.postNavigateCommands.push([screenName, action]);
  }

  private handlePostNavigate(screenName: string) {
    this.postNavigateCommands.filter(data => data[0] === screenName)
      .map(data => data[1])
      .forEach(command => command.execute());
  }
}
