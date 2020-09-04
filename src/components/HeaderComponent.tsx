import * as React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

type Props = {};

export default class HeaderComponent extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}
	render() {
		return (
			<View style={styles.header}>
				<View style={styles.header__textBox}>
					<Text style={styles.header__text}>당첨 확인/등록</Text>
				</View>
				<View style={styles.header__rightBtnBox}>
					<Image style={styles.header__img} source={require('../assets/Img_QR.png')} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		height: 62,
		backgroundColor: '#3d4550',
		flexDirection: 'row-reverse',
	},
	header__rightBtnBox: {
		height: 62,
		width: 22,
		justifyContent: 'center',
		alignItems: 'center',
	},
	header__img: {
		width: 22,
		height: 22,
	},
	header__textBox: {
		height: 62,
		width: 118,
		justifyContent: 'center',
		alignItems: 'center',
	},
	header__text: {
		color: '#ffffff',
		fontSize: 16,
	},
});
