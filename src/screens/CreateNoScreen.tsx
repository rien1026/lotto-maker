import * as React from 'react';
import { NavigationSwitchProp } from 'react-navigation';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

type Props = { navigation: NavigationSwitchProp };

export default class CreateWinNoScreen extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return (
			<View>
				<LottieView source={require('../assets/3407-coinpig.json')} autoPlay loop style={{ width: 300, height: 300 }} />
			</View>
		);
	}
}
