import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TextInput,
	Dimensions
} from 'react-native';
import Keyboard from '../components/Keyboard'
const {width, height} = Dimensions.get('window')

class Game extends Component {

	constructor(props) {
		super(props);
		this.timer = setInterval(() => this.tick(), 1000);
		this.state = { time: 0, ...this.getClear(props) };
	}

	tick() {
		this.setState( {time: this.state.time+1} )
	}

	getClear(props) {
		let params = props.navigation.state.params;
		let level = params.level;
		let answer = [];

		for (var i = 0; i <= level.word.length - 1; i++) {
			let word = level.word[i];
			answer.push(word)
		}

		return {
			answer: answer,
			resp: Array(answer.length)
		};
	}

	componentWillReceiveProps(props) {
		this.setState({ time: 0, ...this.getClear(props) });
		clearInterval(this.timer);
		this.timer = setInterval(() => this.tick(), 1000);
	}

	addWord(word="") {
		let maxWords = this.state.answer.length - 1;
		let pullWords = this.state.resp.filter((b) => (b) ? true : false);
		pullWords.push(word);

		let notFreeWords = pullWords.length;

		for (var i = maxWords - pullWords.length; i >= 0; i--)
			pullWords.push(null)
		
		this.setState({resp : pullWords});

		if(maxWords+1 == notFreeWords)
			this.checkAnswer(pullWords);
	}

	onClick(word) {
		this.addWord(word);
	}

	checkAnswer( pull = [] ) {
		const { navigate } = this.props.navigation;

		if(this.state.answer.join("") == pull.join("")) {
			clearInterval(this.timer);
			navigate("Win", {level: this.props.navigation.state.params.level.num, time: this.state.time });
		}

		this.setState({resp: Array(pull.length)})
	}

	render() {
		let params = this.props.navigation.state.params;
		let level = params.level;
		let images = level.images;
		let ImagesHelp = [];
		
		for(let key in images) {
			let image = images[key];
			ImagesHelp.push(<Image source={image} key={key} style={styles.image}/>)
		}

		let wordInputs = [];
		let key = 0;
		for (let word of this.state.resp)
			wordInputs.push(<Text key={++key} style={styles.wordInput}>{word}</Text>);

		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Уровень {level.num}</Text>
				<Text style={styles.timer}>Потрачено {this.state.time} сек.</Text>
				<View style={styles.flexContainer}>
					{ImagesHelp}
				</View>
				<View style={styles.flexContainer}>
					{wordInputs}
				</View>
				<Keyboard answer={this.state.answer} onClick={(word) => this.onClick(word)}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	flexContainer: {
		display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', flexGrow: 1
	},
	wordInput: {
		width: 30,
		height: 30,
		backgroundColor: '#fac917',
		borderWidth: 3,
		borderColor: '#fac917',
		textAlign: 'center',
		textAlignVertical: 'center',
		margin: 5,
		fontSize: 20,
		fontWeight: '900',
		borderRadius: 5,
		color: '#ffffff'
	},
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#383431',
	},
	image: {
		margin: 10,
		width: (width/2) - 20,
		height: (width/2) - 20
	},
	welcome: {
		fontSize: 27,
		textAlign: 'center',
		margin: 10,
		color: "#ffffff",
		fontWeight: 'bold',
		marginTop: 20,
		marginBottom: 5
	},
	timer: {
		fontSize: 15,
		textAlign: 'center',
		color: "#ffffff",
		fontWeight: '400',
		marginBottom: 10,
	}
});


export default Game;