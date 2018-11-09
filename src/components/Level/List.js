import React, { Component } from 'react';

import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	Dimensions,
	Image,
	TouchableOpacity,
	AsyncStorage
} from 'react-native';
import Star from '../../assets/images/star.png'
import Finish from '../../assets/images/finish.png'

import LevelStorage from '../../controllers/LevelStorage'
import Levels from '../../const/levels'
import ReactNative from 'react-native' 
import { connect } from 'react-redux'
import * as actions from '../../actions'

const {width, height} = Dimensions.get('window');

class List extends Component {

	constructor(props) {
		super(props);
		this.fetchStore()
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
		const { navigate } = this.props.navigation;

		let LevelsList = [];

		for( let level of this.props.levels) {
			let stars = [];
			for (var i = level.stars - 1; i >= 0; i--)
				stars.push(<Image key={i} source={Star} style={styles.star}/>)
			
			let finish = [];
			if(level.complete)
				finish.push(<Image source={Finish} style={styles.finish} key={level.num}/>)

			let levelStyles = (level.canplay) ? styles.level : styles.levelOff;

			LevelsList.push(
				<TouchableOpacity onPress={()=>{
					if(level.canplay) navigate('Game', {level: level} ) 
				}} key={level.num}>
					<View style={levelStyles}>
						{finish}
						<Text style={styles.textLevel}>{level.num}</Text>
						<View style={styles.starsWrapper}>
							{stars}
						</View>
					</View>
				</TouchableOpacity>
			)
		}

		return (
			<ScrollView>
				<View  style={styles.container}>
					{LevelsList}
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	finish: {
		position: 'absolute',
		left: 2,
		top: 2
	},
	textLevel: {
		color: "#ffffff",
		fontSize: 40,
		fontWeight: '900',
		textShadowColor: '#000000',
		textShadowOffset: {
			width: 1,
			height: 0
		},
		textShadowRadius: 10
	},
	level: {
		width: (width - 45) / 3,
		height: (width - 45) / 3,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 5,
		borderColor: '#fac917',
		backgroundColor: '#fac917',
		margin: 5,
		borderRadius: 5
	},
	levelOff: {
		width: (width - 45) / 3,
		height: (width - 45) / 3,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 5,
		borderColor: 'grey',
		backgroundColor: 'grey',
		margin: 5,
		borderRadius: 5
	},
	star: {
		width: ( ( (width - 45) / 3 ) - 30 ) / 5,
		height: ( ( (width - 45) / 3 ) - 30 ) / 5,
		margin: 2
	},
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		flexWrap: 'wrap', 
		width: width,
		marginBottom: 50
	},
	starsWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row' 
	}
});


const stateProps = state => {
  return {
  	levels: state.levels
  };
};

export default connect(stateProps, actions)(List);