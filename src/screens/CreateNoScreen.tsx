import * as React from 'react';
import { NavigationSwitchProp } from 'react-navigation';
import {
	FlatList,
	Text,
	TouchableWithoutFeedback,
	ScrollView,
	View,
	StyleSheet,
	Button,
	TouchableHighlight,
} from 'react-native';
import LottieView from 'lottie-react-native';
import HeaderComponent from '../components/HeaderComponent';

type Props = { navigation: NavigationSwitchProp };
type State = {
	winNoList1: number[];
	winNoList2: number[];
	winNoList3: number[];
	winNoList4: number[];
	winNoList5: number[];
	candidateNoList: any[];
};

export default class CreateWinNoScreen extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			winNoList1: [],
			winNoList2: [],
			winNoList3: [],
			winNoList4: [],
			winNoList5: [],
			candidateNoList: ['n', 'i', 'e'],
		};
	}

	setCandidateNoList = () => {
		let candidateNoList = [];
		for (let i = 1; i < 46; i++) {
			if (i < 3) {
				candidateNoList[i - 1] = 'i';
			} else if (i < 20) {
				candidateNoList[i - 1] = 'e';
			} else {
				candidateNoList[i - 1] = 'n';
			}
		}

		this.setState({ candidateNoList });
	};

	componentDidMount() {
		this.setCandidateNoList();
	}

	createWinNo = () => {
		let winNoList = this.getInclusionNoList();
		let noneCandidateNoList = this.getNoneCandidateNoList();
		let winNoListCnt = winNoList.length;

		for (let i = 0; i < 6 - winNoListCnt; i++) {
			let randomNo = Math.floor(Math.random() * noneCandidateNoList.length);
			winNoList.push(noneCandidateNoList[randomNo]);

			noneCandidateNoList = noneCandidateNoList.slice(0, randomNo).concat(noneCandidateNoList.slice(randomNo + 1));
		}

		return winNoList;
	};

	getNoneCandidateNoList = () => {
		let noneCandidateNoList = [];
		for (let i = 0; i < this.state.candidateNoList.length; i++) {
			if (this.state.candidateNoList[i] !== 'n') {
				continue;
			}

			noneCandidateNoList.push(i);
		}

		return noneCandidateNoList;
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

	setSelectNoFlag = (index: number, flag: 'i' | 'e' | 'n') => {
		let candidateNoList = this.state.candidateNoList;
		if (candidateNoList[index] === flag) {
			candidateNoList[index] = 'n';
		} else if (candidateNoList[index] === 'n') {
			candidateNoList[index] = flag;
		}

		let iCnt = 0;
		let eCnt = 0;
		for (let i = 0; i < candidateNoList.length; i++) {
			if (candidateNoList[i] === 'i') {
				iCnt++;
			} else if (candidateNoList[i] === 'e') {
				eCnt++;
			}
		}

		if (iCnt > 6 || eCnt > 39) {
			return;
		}

		this.setState({ candidateNoList });
	};

	clearAllSelectNoFlag = (flag: 'i' | 'e') => {
		let candidateNoList = this.state.candidateNoList;

		for (let i = 0; i < candidateNoList.length; i++) {
			if (candidateNoList[i] === flag) {
				candidateNoList[i] = 'n';
			}
		}

		this.setState({
			candidateNoList,
		});
	};

	render() {
		return (
			<ScrollView style={styles.screen}>
				<HeaderComponent />
				<View style={styles.container}>
					<View style={styles.noListBox}>
						<Text style={styles['noListBox__text--green']}>-고정번호-</Text>
						<View style={styles.noList}>
							{this.state.candidateNoList.map((item, index) => {
								if (item !== 'i') {
									return;
								}

								return (
									<View key={index}>
										<Text style={styles['noListBox__text--white']}>{index + 1}</Text>
									</View>
								);
							})}
						</View>
					</View>
					<View style={styles.noListBox}>
						<Text style={styles['noListBox__text--red']}>-제외번호-</Text>
						<View style={styles.noList}>
							{this.state.candidateNoList.map((item, index) => {
								if (item !== 'e') {
									return;
								}

								return (
									<View key={index}>
										<Text style={styles['noListBox__text--white']}>{index + 1}</Text>
									</View>
								);
							})}
						</View>
					</View>
					<View style={styles.createWinNoListBox}>
						<View style={styles.createWinNoListBox__imgBox}>
							<LottieView
								source={require('../assets/3407-coinpig.json')}
								autoPlay
								loop
								style={styles.createWinNoListBox__img}
							/>
						</View>
						<View style={styles.createWinNoListBox__winNoListContainer}>
							<View style={styles.createWinNoListBox__createWinNoBtnBox}>
								<TouchableHighlight style={styles.createWinNoListBox__createWinNoBtn}>
									<Text style={styles.createWinNoListBox__createWinNoBtn__text}>번호 지우기!</Text>
								</TouchableHighlight>
							</View>
							<View style={styles.createWinNoListBox__winNoListBox}>
								<View style={styles.createWinNoListBox__winNoList}></View>
							</View>
						</View>
					</View>

					<View style={styles.selectNoListBox}>
						<View style={styles.selectNoListBox__titleBox}>
							<Text style={styles.selectNoListBox__title}>- 고정수 지정하기</Text>
							<TouchableHighlight
								style={styles.selectNoListBox__cancelBtn}
								onPress={() => {
									this.clearAllSelectNoFlag('i');
								}}
							>
								<Text style={styles.selectNoListBox__cancelBtn__text}>전체 취소</Text>
							</TouchableHighlight>
						</View>
						<View style={styles.selectNoListBox__selectNoList}>
							{this.state.candidateNoList.map((item, index) => (
								<View
									style={
										item === 'n'
											? styles.selectNoListBox__circle
											: item === 'i'
											? styles['selectNoListBox__circle--green']
											: styles['selectNoListBox__circle--grey']
									}
									key={index}
								>
									<TouchableWithoutFeedback
										onPress={() => {
											this.setSelectNoFlag(index, 'i');
										}}
									>
										<Text
											style={
												item === 'n'
													? styles.selectNoListBox__text
													: item === 'i'
													? styles['selectNoListBox__text--white']
													: styles['selectNoListBox__text--grey']
											}
										>
											{index + 1}
										</Text>
									</TouchableWithoutFeedback>
								</View>
							))}
						</View>
					</View>
					<View style={styles.selectNoListBox}>
						<View style={styles['selectNoListBox__titleBox--red']}>
							<Text style={styles.selectNoListBox__title}>- 제외수 지정하기</Text>
							<TouchableHighlight
								style={styles.selectNoListBox__cancelBtn}
								onPress={() => {
									this.clearAllSelectNoFlag('e');
								}}
							>
								<Text style={styles.selectNoListBox__cancelBtn__text}>전체 취소</Text>
							</TouchableHighlight>
						</View>
						<View style={styles.selectNoListBox__selectNoList}>
							{this.state.candidateNoList.map((item, index) => (
								<View
									style={
										item === 'n'
											? styles.selectNoListBox__circle
											: item === 'e'
											? styles['selectNoListBox__circle--red']
											: styles['selectNoListBox__circle--grey']
									}
									key={index}
								>
									<TouchableWithoutFeedback
										onPress={() => {
											this.setSelectNoFlag(index, 'e');
										}}
									>
										<Text
											style={
												item === 'n'
													? styles.selectNoListBox__text
													: item === 'e'
													? styles['selectNoListBox__text--white']
													: styles['selectNoListBox__text--grey']
											}
										>
											{index + 1}
										</Text>
									</TouchableWithoutFeedback>
								</View>
							))}
						</View>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	screen: { width: '100%', backgroundColor: '#3d4550', flex: 1 },
	container: { width: '100%', padding: 10 },
	noListBox: { height: 50, paddingLeft: 10 },
	'noListBox__text--green': { lineHeight: 18, fontSize: 16, color: '#3bdd86' },
	'noListBox__text--red': { lineHeight: 18, fontSize: 16, color: '#e36666' },
	'noListBox__text--white': { lineHeight: 18, fontSize: 16, color: '#ffffff', marginRight: 10 },
	noList: { flexDirection: 'row', flexWrap: 'wrap' },
	createWinNoListBox: {
		backgroundColor: '#ffffff',
		borderWidth: 1,
		borderRadius: 25,
		overflow: 'hidden',
		marginTop: 40,
	},
	createWinNoListBox__imgBox: {
		height: 181,
		backgroundColor: '#b5cde0',
		alignItems: 'center',
		flexDirection: 'column-reverse',
	},
	createWinNoListBox__img: {
		width: 150,
		height: 150,
	},
	createWinNoListBox__winNoListContainer: {
		backgroundColor: '#4e8d95',
		height: 70,
	},

	createWinNoListBox__createWinNoBtnBox: { position: 'absolute', alignItems: 'center', width: '100%', marginTop: 14 },
	createWinNoListBox__createWinNoBtn: {
		width: 220,
		height: 56,
		backgroundColor: '#ffc500',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 25,
		borderColor: '#ffc500',
	},
	createWinNoListBox__createWinNoBtn__text: {
		fontSize: 20,
		lineHeight: 23,
		color: '#e2621e',
	},
	createWinNoListBox__winNoListBox: {
		backgroundColor: '#ffffff',
		borderWidth: 1,
		borderRadius: 25,
	},
	createWinNoListBox__winNoList: {},

	selectNoListBox: {
		backgroundColor: '#ffffff',
		borderWidth: 1,
		borderRadius: 25,
		overflow: 'hidden',
		marginTop: 20,
	},
	selectNoListBox__circle: {
		width: 47,
		height: 47,
		borderWidth: 1,
		borderColor: '#ebebeb',
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 8,
	},
	'selectNoListBox__circle--red': {
		width: 47,
		height: 47,
		backgroundColor: '#e36666',
		borderWidth: 1,
		borderColor: '#ebebeb',
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 8,
	},

	'selectNoListBox__circle--green': {
		width: 47,
		height: 47,
		backgroundColor: '#3bdd86',
		borderWidth: 1,
		borderColor: '#ebebeb',
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 8,
	},
	'selectNoListBox__circle--grey': {
		width: 47,
		height: 47,
		backgroundColor: '#dbdbdb',
		borderWidth: 1,
		borderColor: '#ebebeb',
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 8,
	},
	selectNoListBox__text: {
		fontSize: 20,
		lineHeight: 23,
		color: '#3d4550',
	},
	'selectNoListBox__text--white': {
		fontSize: 20,
		lineHeight: 23,
		color: '#ffffff',
	},
	'selectNoListBox__text--grey': {
		fontSize: 20,
		lineHeight: 23,
		color: '#bcbcbc',
	},
	selectNoListBox__selectNoList: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingLeft: 12,
		paddingTop: 12,
		paddingBottom: 12,
	},

	selectNoListBox__titleBox: {
		backgroundColor: '#3bdd86',
		height: 50,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingHorizontal: 20,
	},
	'selectNoListBox__titleBox--red': {
		backgroundColor: '#e36666',
		height: 50,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingHorizontal: 20,
	},
	selectNoListBox__title: { color: '#ffffff', fontSize: 20, lineHeight: 23 },
	selectNoListBox__cancelBtn: {
		width: 90,
		height: 30,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#ffffff',
		borderRadius: 15,
	},
	selectNoListBox__cancelBtn__text: {
		color: '#ff1400',
		fontSize: 12,
		lineHeight: 13,
	},
});
