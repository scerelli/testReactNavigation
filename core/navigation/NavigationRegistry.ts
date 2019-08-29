import { ComponentType } from 'react';
import { INavigationRegistry } from './INavigationRegistry';
import { IScreenEnricher } from './screenEnricher';

type RegistryEntry = {
  [key: string]: {
    screen: ComponentType<any>;
    config: {};
    kind: string;
  };
}

export class NavigationRegistry implements INavigationRegistry {
  private screenRegistry = {};
  private modalRegistry = {};
  private screenEnricher: IScreenEnricher;

  constructor(screenEnricher: IScreenEnricher) {
    this.screenEnricher = screenEnricher;
  }

  elementToRegistry(registry: RegistryEntry, name: string, Component: ComponentType<any>, config: {}, kind: string) {
    if (registry[name] !== undefined) {
      throw Error(`You're trying to add two screen with the same screeName, check ${name}`);
    }

    registry = {
      ...registry,
      [name]: {
        screen: this.screenEnricher.enrich(Component),
        config,
        kind,
      },
    };

    return registry;
  }

  addScreen = (name: string, Component: ComponentType<any>, config = {}) => {
    this.screenRegistry = this.elementToRegistry(this.screenRegistry, name, Component, config, 'screen');

    return this.screenRegistry[name];
  }

  addModal = (name: string, Component: ComponentType<any>, config = {}) => {
    this.modalRegistry = this.elementToRegistry(this.modalRegistry, name, Component, config, 'modal');

    return this.modalRegistry[name];
  }

  getScreens = () => this.screenRegistry;

  getModals = () => this.modalRegistry;

  getScreen = (key: string) =>
    this.screenRegistry[key]

  getModal = (key: string) =>
    this.modalRegistry[key]
}
