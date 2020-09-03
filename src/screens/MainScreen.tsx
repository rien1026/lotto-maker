import * as React from 'react';
import { NavigationSwitchProp } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import TabNavigator from '../navigators/TabNavigator';
import fetch from 'node-fetch';
import { Constants } from '../utils/Constants';
import HeaderComponent from 'components/HeaderComponent';
import { View } from 'react-native';

type Props = { navigation: NavigationSwitchProp };

export default class MainScreen extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
		this.setRecentWinHistoryList();
	}

	setRecentWinHistoryList = async () => {
		let winHistoryListStr = await this.getWinHistoryListStrFromAsync();
		if (!winHistoryListStr) {
			// set all history list
			let winHistoryList = await this.getWinHistoryList();
			this.setWinHistoryListToAsync(winHistoryList);
		} else {
			// set recent history list
			let lastRoundNo = JSON.parse(winHistoryListStr)[0].roundNo;
			let recentWinHistoryList = await this.getWinHistoryList(lastRoundNo);

			if (recentWinHistoryList.length > 0) {
				this.setWinHistoryListToAsync(recentWinHistoryList.concat(JSON.parse(winHistoryListStr)));
			}

			console.log(lastRoundNo);
		}
	};

	getWinHistoryList = async (roundNo: string = '') => {
		let URL = Constants.API_URL + '/lottos' + (roundNo ? '?startNo=' + roundNo : '');
		let result = await fetch(URL);
		let resultJson = await result.json();

		if (!Array.isArray(resultJson.data) || resultJson.data.length === 0) {
			return [];
		} else {
			return resultJson.data.sort((a, b) => {
				return b.roundNo - a.roundNo;
			});
		}
	};

	getWinHistoryListStrFromAsync = async () => {
		try {
			return await AsyncStorage.getItem('winHistoryList');
		} catch (error) {}
	};

	setWinHistoryListToAsync = async (winHistoryList: any[]) => {
		try {
			await AsyncStorage.setItem('winHistoryList', JSON.stringify(winHistoryList));
		} catch (error) {}
	};

	render() {
		return <TabNavigator />;
	}
}
