import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { connect, Provider } from 'react-redux';
import { AppRegistry, Navigator, AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { devToolsEnhancer, composeWithDevTools} from 'remote-redux-devtools';
import uuid from 'uuid';

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
  async componentWillMount() {
    try {
      const ownerId = await AsyncStorage.getItem('user_id');
      if (!ownerId)  {
        const newOwnerId  =  uuid.v4();
        await AsyncStorage.setItem('user_id', newOwnerId)
          .then((doc) => console.log(doc))
          .catch((err) => alert(err.toString()));

      }
    } catch (err) {
      const ownerId  =  uuid.v4();
      await AsyncStorate.setItem('user_id', ownerId)
        .then((doc) => console.log(doc))
        .catch((err) => alert(err.toString()));
    }
  }

  render() {
    return (
        <Provider store={store}>
          <RouterWithRedux scenes={scenes}/>
        </Provider>
    );
  }
}
