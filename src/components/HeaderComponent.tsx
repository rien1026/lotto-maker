import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '../themes/Color';

type Props = {};

export default class HeaderComponent extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}
	render() {
		return (
			<View style={styles.header}>
				<View style={styles.header__rightBtnBox}></View>
				<View style={styles.header__textBox__text}>
					<Text style={styles.header__text}>당첨 확인/등록</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		height: 42,
		backgroundColor: '#3d4550',
		flexDirection: 'row-reverse',
	},
	header__rightBtnBox: {
		height: 42,
		backgroundColor: 'blue',
	},
	header__textBox__text: {
		height: 42,
		width: 118,
		backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center',
	},
	header__text: {
		color: '#ffffff',
	},
});
