import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import Levels from '../const/levels'
import LevelStorage from '../controllers/LevelStorage'

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


export default Win;