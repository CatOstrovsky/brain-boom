import React, {Component} from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	Dimensions,
  AsyncStorage
} from 'react-native';
import Settings from '../components/Settings'
import Levels from '../const/levels'

type Props = {};
export default class App extends Component<Props> {

  render() {
  	const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
      	<Settings/>
      	<View style={styles.contentWrapper}>
	        <Text style={styles.welcome}>Brain Boom</Text>
	        <TouchableOpacity onPress={() => navigate('Levels') }>
	        	<Image source={require('../assets/images/play-button.png')}/>
	        </TouchableOpacity>
	     </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#383431',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: "#ffffff",
    fontWeight: 'bold',
    marginBottom: 50
  },
  contentWrapper: {
    flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'
  }
});
