import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SuccessfulLogin() {
	const navigation = useNavigation();

	// After 2 seconds, go to the TodoList
	useEffect( () => {
		setTimeout(() => {
			navigation.navigate("TodoList" as never);
		}, 2000)
	})

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
		height: 150,
		textAlign: 'center',
		textAlignVertical: 'center',
		paddingTop: 60
	}
})