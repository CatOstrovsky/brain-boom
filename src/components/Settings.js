'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Dimensions,
  Image
} from 'react-native';

class Settings extends Component {
  render() {
  	const {width, height} = Dimensions.get('window');
  	return(<View/>);
    return (
      <View style={{ display: 'flex', alignItems: 'flex-end', paddingTop: 20, width: width, paddingRight: 20 }}>
  		<Image source={require('../assets/images/settings-work-tool.png')} style={{width: 30, height: 30 }}/>
  	</View>
    );
  }
}

const styles = StyleSheet.create({

});


export default Settings;