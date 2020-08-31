import * as React from 'react';
import { NavigationSwitchProp } from 'react-navigation';
import { View, FlatList, Text, TouchableWithoutFeedback } from 'react-native';
import LottieView from 'lottie-react-native';

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
			candidateNoList: [{ 1: 'n' }],
		};
	}

	setCandidateNoList = () => {
		let candidateNoList = [];
		for (let i = 1; i < 46; i++) {
			let candidateNo = {};
			candidateNo[i] = 'n';
			candidateNoList.push(candidateNo);
		}

		this.setState({ candidateNoList });
	};

	componentDidMount() {
		this.setCandidateNoList();
	}

	createWinNo = () => {
		let winNoList = [];
		let winNoMap = {};
		let whileLimit = 0;
		while (winNoList.length < 8) {
			// for avoid loop
			whileLimit++;
			if (whileLimit > 100) {
				return;
			}

			let winNo = Math.ceil(Math.random() * 45);

			if (winNoMap[winNo]) {
				continue;
			}

			winNoMap[winNo] = 1;
			winNoList.push(winNo);
		}

		console.log(winNoList);
	};

	setNoFlag = (index: number, flag: 'i' | 'e' | 'n') => {
		this.state.candidateNoList[index] = flag;
		this.setState({ candidateNoList: this.state.candidateNoList });
	};

	render() {
		return (
			<View>
				<LottieView source={require('../assets/3407-coinpig.json')} loop style={{ width: 300, height: 300 }} />
				<FlatList
					data={this.state.candidateNoList}
					renderItem={(item) => (
						<View>
							<TouchableWithoutFeedback
								onPress={() => {
									this.setNoFlag(item.index + 1, 'i');
								}}
							>
								<Text>{item.index + 1}</Text>
							</TouchableWithoutFeedback>
						</View>
					)}
					numColumns={5}
					keyExtractor={(item) => JSON.stringify(item)}
				/>
			</View>
		);
	}
}
