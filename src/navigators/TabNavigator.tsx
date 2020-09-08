import * as React from 'react';

import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import { COLORS } from '../themes';
import { StyleSheet } from 'react-native';
import CreateWinNoScreen from '../screens/CreateNoScreen';
import CheckWinNoScreen from '../screens/CheckWinNoScreen';
import WinNoHistoryScreen from '../screens/WinNoHistoryScreen';

const styles = StyleSheet.create({
	tab: {
		backgroundColor: '#816f66',
		height: 60,
	},
	label: {
		fontSize: 16,
		lineHeight: 18,
	},

	indicator: {
		borderBottomColor: COLORS.BLACK,
		borderBottomWidth: 2,
	},
});

const tabNavigator = createMaterialTopTabNavigator(
	{
		CreateWinNo: {
			screen: ({ screenProps, navigation }) => <CreateWinNoScreen navigation={navigation} />,
			navigationOptions: {
				tabBarLabel: '번호생성',
			},
		},
		WinNoHistory: {
			screen: ({ screenProps, navigation }) => <WinNoHistoryScreen navigation={navigation} />,
			navigationOptions: {
				tabBarLabel: '회차별 당첨',
			},
		},
		CheckWinNo: {
			screen: ({ screenProps, navigation }) => <CheckWinNoScreen navigation={navigation} />,
			navigationOptions: {
				tabBarLabel: '당첨확인',
			},
		},
	},
	{
		initialRouteName: 'CreateWinNo',
		swipeEnabled: true,
		tabBarPosition: 'bottom',
		tabBarOptions: {
			showLabel: true,
			activeTintColor: COLORS.WHITE,
			inactiveTintColor: COLORS.GRAY,
			tabStyle: styles.tab,
			labelStyle: styles.label,
			indicatorStyle: styles.indicator,
		},
	},
);

export default createAppContainer(tabNavigator);
