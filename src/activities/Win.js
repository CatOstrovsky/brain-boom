import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import LevelStorage from '../controllers/LevelStorage'
import Levels from '../const/levels'
import ReactNative from 'react-native' 
import { connect } from 'react-redux'
import * as actions from '../actions'

class Win extends Component {

  constructor(props) {
    super(props);
    this.setComplete(props);
    this.state = {};
  }
  componentWillReceiveProps(props) {
    this.setComplete(props);
  }

  setComplete(props) {
    let currentLevel = props.navigation.state.params.level;
    let time = props.navigation.state.params.time;

    let stars = 1;
    if(time < 20) {
      stars = 5
    }else if(time < 30) {
      stars = 4
    }else if(time < 40) {
      stars = 3
    }else if(time < 50) {
      stars = 2
    }

    LevelStorage.updateLevel(currentLevel-1, { complete: 1, stars: stars });
    LevelStorage.updateLevel(currentLevel, { canplay: 1 });

    this.fetchStore();

  }

  fetchStore() {

    let ids = [];
    for (var i = Levels.length - 1; i >= 0; i--)
      ids.push(i);

    let stores = LevelStorage.getLevels(ids)
    .then((store) => {
      store.map((result, i, store) => {
          let key = store[i][0],
          value = store[i][1];
          if(value) {
            for(let id of ids) {
              if(LevelStorage.getKey(id) == key) {
                try{
                  value = JSON.parse(value);
                  Levels[id] = Object.assign(Levels[id], value);
                }catch(e){}
              }
            }
         }
        })

        this.props.updateStorage(Levels)
    })
  }


  render() {

  	let currentLevel = this.props.navigation.state.params.level;
    let time = this.props.navigation.state.params.time;
  	const { navigate } = this.props.navigation;
  	let nextLevel = Levels[currentLevel];

    return (
      <View style={styles.container}>
        <Text style={{ color: "#ffffff", fontSize: 30, fontWeight: '900', marginBottom: 5 }}>Победа!</Text>
        <Text style={{color: "#ffffff", fontSize: 17, fontWeight: '600', marginBottom: 20}}>Затрачено времени {time} секунд</Text>
        <Image source={require("../assets/images/win.png")} />
        <TouchableOpacity onPress={() => {
          if(nextLevel) {
            navigate('Game', {level: nextLevel});
          }else{
            navigate('Levels');
          } 
        }}>
        <Text style={styles.button}>Следующий уровень</Text>
        </TouchableOpacity>
      </View>
      );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fac917',
	},
	button: {
		backgroundColor: '#ffffff',
		color: '#fac917',
		textAlignVertical: 'center',
		textAlign: 'center',
		padding: 25,
		paddingBottom: 15,
		paddingTop: 15,
		marginTop: 25,
		borderRadius: 10,
		fontWeight: '400',
		fontSize: 20 
	}
});


const stateProps = state => {
  return {
    levels: state.levels
  };
};

export default connect(stateProps, actions)(Win);