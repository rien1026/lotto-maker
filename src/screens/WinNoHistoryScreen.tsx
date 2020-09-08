import * as React from 'react';
import { NavigationSwitchProp } from 'react-navigation';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

type Props = { navigation: NavigationSwitchProp };
type State = {
	winHistoryList: any[];
};

export default class WinNoHistoryScreen extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			winHistoryList: [],
		};
	}

	componentDidMount() {
		this.getWinHistoryListStrFromAsync().then((winHistoryList) => {
			this.setState({
				winHistoryList: JSON.parse(winHistoryList),
			});
		});
	}

	getWinHistoryListStrFromAsync = async () => {
		try {
			return await AsyncStorage.getItem('winHistoryList');
		} catch (error) {
			return '[]';
		}
	};

	render() {
		return (
			<View>
				<FlatList
					style={{}}
					data={this.state.winHistoryList}
					keyExtractor={(item, index) => String(index)}
					renderItem={(item) => (
						<View>
							<Text>{JSON.stringify(item)}</Text>
						</View>
					)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({});
