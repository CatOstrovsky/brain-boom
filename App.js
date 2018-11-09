import { createStackNavigator } from 'react-navigation'
import Home from './src/activities/Home'
import Levels from './src/activities/Levels'
import Game from './src/activities/Game'
import Win from './src/activities/Win'

import reducer from './src/reducers'
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';

let similarOptionsHeader =  { header: null };

const Activities = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions : { ...similarOptionsHeader }
  },
  Levels: {
    screen: Levels,
    navigationOptions : { ...similarOptionsHeader }
  },
  Game: {
    screen: Game,
    navigationOptions : { ...similarOptionsHeader }
  },
  Win: {
    screen: Win,
    navigationOptions : { ...similarOptionsHeader }
  }
});

const store = createStore(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Activities />
      </Provider>
    );
  }
}