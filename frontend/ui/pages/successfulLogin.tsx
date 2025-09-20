import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SuccessfulLogin() {
	return (
		<View
			style={styles.container}
		>
			<Text
				style={styles.successMessage}
			>LOGIN SUCCESSFUL</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	successMessage: {
		fontWeight: 'bold',
		borderColor: 'black',
		borderWidth: 2,
		width: 500,
		height: 200,
		alignContent: 'center',
	}
})