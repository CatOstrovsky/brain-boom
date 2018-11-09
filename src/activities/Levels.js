import React, {Component} from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	Dimensions
} from 'react-native';
import Settings from '../components/Settings'
import LevelList from '../components/Level/List'

export default class App extends Component<Props> {

  render() {
  	const {width, height} = Dimensions.get('window');
  	const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
      	<Settings/>
        <View style={styles.contentWrapper}>
          <Text style={styles.welcome}>Выберите уровень</Text>

          <LevelList navigation={this.props.navigation}/>

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
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: "#ffffff",
    fontWeight: 'bold',
    marginBottom: 50
  },
  contentWrapper: {
    flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start'
  }
});
