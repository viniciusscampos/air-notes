import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { connect, Provider } from 'react-redux';
import { AppRegistry, Navigator } from 'react-native';
import { devToolsEnhancer, composeWithDevTools} from 'remote-redux-devtools';

import reducers from '../reducers';

const RouterWithRedux = connect()(Router);

const middleware = [];
const composeEnhancers = composeWithDevTools({realtime: true});
const store = createStore(composeEnhancers(
  applyMiddleware(...middleware),
));

import HomeMenu from './home';

const scenes = Actions.create(
    <Scene key="root">
      <Scene key="home" component={HomeMenu} initial={true} hideNavBar={true} panHandlers={null}/>
    </Scene>
);

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <RouterWithRedux scenes={scenes}/>
        </Provider>
    );
  }
}