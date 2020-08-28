import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainScreen from '../screens/MainScreen';

const introNavigator = createSwitchNavigator(
	{
		Main: {
			screen: MainScreen,
		},
	},
	{ defaultNavigationOptions: { header: null } },
);

export default createAppContainer(introNavigator);
