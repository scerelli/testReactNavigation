import { StackActions, NavigationActions } from 'react-navigation';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { withMappedNavigationParams } from 'react-navigation-props-mapper';
import { ReactNavigationManager } from './ReactNavigationManager';
import { DeepLinkNavigationManager } from './DeepLinkNavigationManager';
import { RoutableNavigationManager } from './RoutableNavigationManager';
import { NavigationCreator } from './NavigationCreator';
import { NavigationRegistry } from './NavigationRegistry';
import { screenEnricher } from './screenEnricher';
import { HistoryStackHolder } from './HistoryStackHolder';

export const historyStackHolder = new HistoryStackHolder();
export const navigationRegistry = new NavigationRegistry(screenEnricher(withMappedNavigationParams));
export const navigationCreator= new NavigationCreator(
  {
    createStackNavigator,
    createAppContainer,
  },
  historyStackHolder,
);

export const reactNavigationManager = new ReactNavigationManager(
  StackActions,
  NavigationActions,
  historyStackHolder,
);

export const deepLinkNavigationManager = new DeepLinkNavigationManager(reactNavigationManager);
const routableNavigationManager = new RoutableNavigationManager(deepLinkNavigationManager);

export const navigationManager = routableNavigationManager;


