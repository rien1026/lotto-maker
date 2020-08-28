import * as React from 'react';

import 'react-native-gesture-handler';
import IntroNavigator from './navigators/IntroNavigator';

type Props = {};

export default class App extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return <IntroNavigator />;
	}
}
