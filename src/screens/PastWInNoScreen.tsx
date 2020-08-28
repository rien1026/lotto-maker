import * as React from 'react';
import { NavigationSwitchProp } from 'react-navigation';
import { View } from 'react-native';

type Props = { navigation: NavigationSwitchProp };

export default class PastWinNoScreen extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return <View />;
	}
}
