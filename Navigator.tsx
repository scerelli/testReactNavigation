import React, { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { navigationCreator, navigationRegistry } from './core/navigation/navigationContainer';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { INavigationManager } from './core/navigation/INavigationManager';
import { withNavigation } from './core/decorators';
import { createBottomTabNavigator } from 'react-navigation';

const onPress = (navManager: INavigationManager, goTo: string) => () => {
  navManager.navigateTo(goTo);
}

const dummyComponent = (viewDescription: string) => withNavigation(({ navigationManager }) => {
  useEffect(() => {
    if(viewDescription === 'splashScreen') {
      navigationManager.replace('main');
    }
  }, []);

  if(viewDescription === 'splashScreen') null;

  return (
    <SafeAreaView>
      <Text>{viewDescription}</Text>
      <TouchableHighlight onPress={onPress(navigationManager, 'home')}>
        <Text>Go to home</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={onPress(navigationManager, 'activities')}>
        <Text>Go to activities</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={onPress(navigationManager, 'otherother')}>
        <Text>Go to other</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={onPress(navigationManager, 'modalOne')}>
        <Text>Go to modalOne</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={onPress(navigationManager, 'modalTwo')}>
        <Text>Go to modalTwo</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
});

const MainTabs = createBottomTabNavigator(
  {
    rootTab: dummyComponent('rootTab'),
    notifications: dummyComponent('notifications'),
    user: dummyComponent('user'),
    someStuff: dummyComponent('someStuff'),
    otherStuff: dummyComponent('otherStuff'),
  },
);

navigationRegistry.addScreen('home', dummyComponent('home'));
navigationRegistry.addScreen('splashScreen', dummyComponent('splashScreen'));
navigationRegistry.addScreen('main', MainTabs);
navigationRegistry.addScreen('activities', dummyComponent('activities'));
navigationRegistry.addScreen('other', dummyComponent('other'));
navigationRegistry.addModal('modalOne', dummyComponent('addModal'));
navigationRegistry.addModal('modalTwo', dummyComponent('modalTwo'));

const screens = navigationRegistry.getScreens();
const modals = navigationRegistry.getModals();

const MainStack = navigationCreator.createStack(
  screens,
  {
    initialRouteName: 'splashScreen',
  },
);

export const Navigator = navigationCreator.create({
  rootStack: {
    screen: MainStack,
  },
  ...modals,
}, {
  mode: 'modal',
  headerMode: 'none',
  transparentCard: true,
  defaultNavigationOptions: {
    header: null,
  },
});
