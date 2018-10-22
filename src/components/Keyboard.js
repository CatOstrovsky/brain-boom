'use strict';

import React, { Component } from 'react';

import {
	StyleSheet,
	View,
	Text,
	Dimensions,
	TouchableOpacity
} from 'react-native';

const {width, height} = Dimensions.get('window');

class Keyboard extends Component {
	constructor(props) {
		super(props);

		let answer = this.buildRandomAnswers(props.answer);
		this.state = { answer: answer};
	}

	componentWillReceiveProps(props) {
		if(this.props.answer != props.answer) {
			let answer = this.buildRandomAnswers(props.answer);
			this.setState({ answer: answer });
		}
	}

	buildRandomAnswers(base = []) {
		let words = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л'];
		let out = [];

		for (var i = 15; i >= 0; i--) {
			let rndWord = words[parseInt(Math.random() * words.length)]
			out.push(rndWord)
		}
		
		let insertedPlace = [];
		for(let w of base) {
			let position = this.getFreeSpace(out, insertedPlace);
			out[position] = w;
			insertedPlace.push(position);
		}

		return out;
	}

	getFreeSpace(stack=[], history = []) {
		let rnd = parseInt(Math.random() * stack.length);
		if(history.indexOf(rnd) >= 0) {
			rnd = this.getFreeSpace(stack, history);
		}
		return rnd;
	}

	render() {
		let buttons = [];
		let key = 0;
		let ans = this.state.answer;

		for(let word of ans)
			buttons.push(
			<TouchableOpacity key={++key} onPress={() => this.props.onClick(word)}>
				<Text style={styles.button}>{word}</Text>
			</TouchableOpacity>
			)

		return (
			<View style={styles.keyboard}>
				{buttons}
			</View>
			);
	}
}

const styles = StyleSheet.create({
	keyboard: {
		width: width,
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#fac917',
		padding: 5    
	},
	button: {
		width: (width-90) / 8,
		padding: 5,
		margin: 5,
		borderRadius: 5,
		fontSize: 18,
		fontWeight: 'bold',
		backgroundColor: '#ffffff',
		height: (width-90) / 8,
		textAlign: 'center',
		textAlignVertical: 'center' 
	}
});


export default Keyboard;