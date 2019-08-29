import { withProps } from 'recompose';
import { navigationManager } from './navigation/navigationContainer';

export const withNavigation = withProps({
  navigationManager: navigationManager,
});
