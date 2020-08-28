import * as React from 'react';
import { NavigationSwitchProp } from 'react-navigation';
import { View, Text } from 'react-native';

type Props = { navigation: NavigationSwitchProp };

export default class CheckWinNoScreen extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return (
			<View>
				<Text>CheckWinNoScreen</Text>
			</View>
		);
	}
}
