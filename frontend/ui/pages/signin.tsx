import React, { use } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Form from "../components/form/form";
import { PRIMARY_COLOR, WARNING_COLOR } from "../../styles/colors";
import { useSizeScheme } from "../../hooks/use-size-scheme";
import { FormFieldType } from "../components/form/formField";

/**
 * Returns true if the input string contains only valid characters (alphanumeric), false otherwise.
 * @param input - the input string to check
 * @returns 
 */
const checkInvalidCharacters = (input: string): boolean => {
	const regex = /^[a-zA-Z0-9]*$/;
	return regex.test(input);
}

/**
 * The SignIn page component. Contains a form for users to sign in with their credentials.
 * @author Zoe Bingham
 */
export default function SignIn() {
	const sizes = useSizeScheme();
	const signInFields: Array<FormFieldType> = [
		{ 
			type: "text", 
			placeholder: "Username",
			validator: checkInvalidCharacters
		},
		{ 
			type: "password", 
			placeholder: "Password",
			validator: checkInvalidCharacters
		}
	]

	const verifyCredentials = (): boolean => {
		// TODO: Add real verification logic here
		return true;
	}

	const onSubmit = (): boolean => {
		return verifyCredentials();;
	}

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

			{/** Form Section */}
			<Form 
				fields={signInFields} 
				onSubmit={onSubmit}
				warningMessage="Invalid credentials, please try again."
			></Form>

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
	forgotPassword: {
		color: PRIMARY_COLOR,
		margin: 'auto'
	}
})