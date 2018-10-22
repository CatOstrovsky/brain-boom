import { createStackNavigator } from 'react-navigation'
import Home from './src/activities/Home'
import Levels from './src/activities/Levels'
import Game from './src/activities/Game'
import Win from './src/activities/Win'

let similarOptionsHeader =  { header: null };

const App = createStackNavigator({
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

export default App;