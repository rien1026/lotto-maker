import * as React from 'react';

import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import { COLORS } from '../themes';
import { StyleSheet } from 'react-native';
import CreateWinNoScreen from '../screens/CreateNoScreen';
import CheckWinNoScreen from '../screens/CheckWinNoScreen';
import PastWinNoScreen from '../screens/PastWInNoScreen';

const styles = StyleSheet.create({
	tab: {
		backgroundColor: COLORS.BLACK,
		height: 60,
		paddingVertical: 15,
	},
	label: {
		fontSize: 8,
		lineHeight: 8,
	},

	indicator: {
		borderBottomColor: COLORS.BLACK,
		borderBottomWidth: 2,
	},

	icon: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const tabNavigator = createMaterialTopTabNavigator(
	{
		CreateWinNo: {
			screen: ({ screenProps, navigation }) => <CreateWinNoScreen navigation={navigation} />,
			navigationOptions: {
				tabBarLabel: '1',
			},
		},
		PastWinNo: {
			screen: ({ screenProps, navigation }) => <PastWinNoScreen navigation={navigation} />,
			navigationOptions: {
				tabBarLabel: '2',
			},
		},
		CheckWinNo: {
			screen: ({ screenProps, navigation }) => <CheckWinNoScreen navigation={navigation} />,
			navigationOptions: {
				tabBarLabel: '3',
			},
		},
	},
	{
		initialRouteName: 'CreateWinNo',
		swipeEnabled: true,
		tabBarPosition: 'bottom',
		tabBarOptions: {
			showLabel: true,
			showIcon: true,
			activeTintColor: COLORS.WHITE,
			inactiveTintColor: COLORS.GRAY,
			tabStyle: styles.tab,
			labelStyle: styles.label,
			indicatorStyle: styles.indicator,
			iconStyle: styles.icon,
		},
	},
);

export default createAppContainer(tabNavigator);
