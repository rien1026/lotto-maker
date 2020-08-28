import * as React from 'react';
import { NavigationSwitchProp } from 'react-navigation';
import TabNavigator from '../navigators/TabNavigator';

type Props = { navigation: NavigationSwitchProp };

export default class MainScreen extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return <TabNavigator />;
	}
}
