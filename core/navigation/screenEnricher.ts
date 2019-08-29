import { ComponentType } from 'react';

export interface IScreenEnricher {
  enrich(screen: ComponentType<any>): ComponentType<any>;
}

export function screenEnricher(mapper): IScreenEnricher {
  return {
    enrich: (screen: ComponentType<any>) => mapper()(screen),
  };
}
