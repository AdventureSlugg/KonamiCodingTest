import React, { use } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Form from "../components/form/form";
import { PRIMARY_COLOR, WARNING_COLOR } from "../../styles/colors";
import { useSizeScheme } from "../../hooks/use-size-scheme";

/**
 * The SignIn page component. Contains a form for users to sign in with their credentials.
 * @author Zoe Bingham
 */
export default function SignIn() {
	const sizes = useSizeScheme();

	return (
		<View>
			{/** Logo Section */}
			<Image 
				source={require("../../assets/konami-logo.png")} 
				style={{
					...styles.logo,
					width: sizes.iconSize * 20,
					height: sizes.iconSize * 20,
				}}
			/>

			{/** Warning Message */}
			<Text
				style={styles.warningMessage}
			>
				Invalid credentials, please try again.
			</Text>

			{/** Form Section */}
			<Form></Form>

			{/** Forgot Password Section */}
			<Text
				style={styles.forgotPassword}
			>
				forgot password?
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	logo: {
		resizeMode: 'contain',
	},
	warningMessage: {
		color: WARNING_COLOR,
		margin: 'auto'
	},
	forgotPassword: {
		color: PRIMARY_COLOR,
		margin: 'auto'
	}
})