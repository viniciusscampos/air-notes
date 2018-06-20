import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { connect, Provider } from 'react-redux';
import { AppRegistry, Navigator } from 'react-native';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { devToolsEnhancer, composeWithDevTools} from 'remote-redux-devtools';

import reducers from '../reducers';

const RouterWithRedux = connect()(Router);

const middleware = [thunk, promiseMiddleware];
const composeEnhancers = composeWithDevTools({realtime: true});
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(...middleware),
));

import HomeMenu from './home';
import AnchorScanner from './anchorScanner';

const scenes = Actions.create(
    <Scene key="root">
      <Scene key="home" component={HomeMenu} initial={true} hideNavBar={true} panHandlers={null}/>
      <Scene key="anchorScanner" component={AnchorScanner} hideNavBar={true}></Scene>
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
