import * as React from 'react';
import { NavigationSwitchProp } from 'react-navigation';
import { FlatList, Text, TouchableWithoutFeedback, ScrollView, View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import HeaderComponent from '../components/HeaderComponent';

type Props = { navigation: NavigationSwitchProp };
type State = {
	winNoList: [];
	candidateNoList: any[];
};

export default class CreateWinNoScreen extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			winNoList: [],
			candidateNoList: ['n', 'i', 'e'],
		};
	}

	setCandidateNoList = () => {
		let candidateNoList = [];
		for (let i = 1; i < 46; i++) {
			candidateNoList[i - 1] = 'n';
		}

		this.setState({ candidateNoList });
	};

	componentDidMount() {
		this.setCandidateNoList();
	}

	createWinNo = () => {
		let winNoList = this.getInclusionNoList();
		let winNoMap = {};
		let whileLimit = 0;

		let exclusionNoMap = this.getExclusionNoMap();

		while (winNoList.length < 8) {
			// for avoid loop
			whileLimit++;
			if (whileLimit > 100) {
				return;
			}

			let winNo = Math.ceil(Math.random() * 45);

			if (winNoMap[winNo] || exclusionNoMap[winNo]) {
				continue;
			}

			winNoMap[winNo] = 1;
			winNoList.push(winNo);
		}
	};

	getInclusionNoList = () => {
		let inclusionNoList = [];
		for (let i = 0; i < this.state.candidateNoList.length; i++) {
			if (this.state.candidateNoList.length[i] !== 'i') continue;

			inclusionNoList.push(i);
		}

		return inclusionNoList;
	};

	getExclusionNoMap = () => {
		let exclusionNoMap = {};
		for (let i = 0; i < this.state.candidateNoList.length; i++) {
			if (this.state.candidateNoList.length[i] !== 'e') continue;

			exclusionNoMap[i] = 1;
		}

		return exclusionNoMap;
	};

	setNoFlag = (index: number, flag: 'i' | 'e' | 'n') => {
		this.state.candidateNoList[index] = flag;

		let iCnt = 0;
		let eCnt = 0;
		for (let i = 0; i < this.state.candidateNoList.length; i++) {
			if (this.state.candidateNoList[i] === 'i') {
				iCnt++;
			} else if (this.state.candidateNoList[i] === 'e') {
				eCnt++;
			}
		}

		if (iCnt > 7 || eCnt > 7) {
			return;
		}

		this.setState({ candidateNoList: this.state.candidateNoList });
	};

	render() {
		return (
			<ScrollView style={{ width: '100%', flex: 1 }}>
				<HeaderComponent />
				<View style={styles.noListBox}>
					<Text style={styles['noListBox__text--green']}>-고정번호-</Text>
					<View style={styles.noListBox__noList}>
						{this.state.candidateNoList.map((item, index) => {
							if (item === 'i') {
								return;
							}

							return (
								<View style={{ width: 50, height: 50, backgroundColor: 'red' }} key={index}>
									<Text>{index + 1}</Text>
								</View>
							);
						})}
					</View>
				</View>
				<View style={styles.noListBox}>
					<Text style={styles['noListBox__text--red']}>-제외번호-</Text>
					<View style={styles.noListBox__noList}></View>
				</View>
				<View style={{ flex: 1, alignItems: 'center', backgroundColor: '#ebebeb', borderWidth: 1 }}>
					<LottieView source={require('../assets/3407-coinpig.json')} loop style={{ width: 300, height: 300 }} />
				</View>
				<View style={styles.winNoListBox}>
					{this.state.candidateNoList.map((item, index) => (
						<View style={{ width: 50, height: 50, backgroundColor: 'red' }} key={index}>
							<TouchableWithoutFeedback
								onPress={() => {
									this.setNoFlag(item.index, 'i');
								}}
							>
								<Text>{index + 1}</Text>
							</TouchableWithoutFeedback>
						</View>
					))}
				</View>
				<View style={styles.winNoListBox}>
					{this.state.candidateNoList.map((item, index) => (
						<View style={{ width: 50, height: 50, backgroundColor: 'blue' }} key={index}>
							<TouchableWithoutFeedback
								onPress={() => {
									this.setNoFlag(item.index, 'e');
								}}
							>
								<Text>{index + 1}</Text>
							</TouchableWithoutFeedback>
						</View>
					))}
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	noListBox: { height: 50, backgroundColor: 'red', paddingLeft: 10 },
	'noListBox__text--green': { lineHeight: 18, fontSize: 16, color: '#3bdd86' },
	'noListBox__text--red': { lineHeight: 18, fontSize: 16, color: '#e36666' },
	'noListBox__text--white': { lineHeight: 18, fontSize: 16, color: '#ffffff' },
	noListBox__noList: {},
	winNoListBox: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#ebebeb',
		borderWidth: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});
