import { ComponentType } from 'react';
import { NavigationScreenOptions } from 'react-navigation';

export type ScreenOptions = NavigationScreenOptions;

export type NavigatorElement = {
  screen: ComponentType<any>;
  path?: string;
  config?: {};
}

export interface INavigationRegistry {
  addScreen: (name: string, Component: ComponentType<any>, config?: ScreenOptions) => void;
  addModal: (name: string, Component: ComponentType<any>, config?: ScreenOptions) => void;
  getScreen: (name: string) => NavigatorElement;
  getModal(name: string): NavigatorElement;
  getScreens: () => Record<string, NavigatorElement>;
  getModals: () => Record<string, NavigatorElement>;
}
