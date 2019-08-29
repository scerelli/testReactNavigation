import { Component, ElementType } from 'react';
import { ScreenOptions } from './INavigationRegistry';

export type NavigatorOptions = {};
export type Screens = Record<string, { screen: ElementType<any>; config?: ScreenOptions }>

export interface INavigationCreator {
  create: (screens: Screens, config?: object) => Component;
  createStack: (screens: Screens, config?: object) => Component;
}
