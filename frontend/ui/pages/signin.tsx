import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Form from "../components/form/form";
import { PRIMARY_COLOR } from "../../styles/colors";
import { useSizeScheme } from "../../hooks/use-size-scheme";
import { FormFieldType } from "../components/form/formField";
import { useNavigation } from "@react-navigation/native";
import { isAlphaNumeric } from "../../utilities/validators";

/**
 * The SignIn page component. Contains a form for users to sign in with their credentials.
 * @author Zoe Bingham
 */
export default function SignIn() {
	const navigation = useNavigation();
	const sizes = useSizeScheme();
	const signInFields: Array<FormFieldType> = [
		{ 
			type: "text", 
			placeholder: "Username",
			validator: isAlphaNumeric
		},
		{ 
			type: "password", 
			placeholder: "Password",
			validator: isAlphaNumeric
		}
	]

	const authenticateCredentials = (): boolean => {
		// TODO: Add real verification logic here
		return true;
	}

	const onSubmit = (): boolean => {
		const authenticated = authenticateCredentials();
		if (authenticated) {
			console.log("Credentials verified, signing in...");
			navigation.navigate("SuccessfulLogin" as never);
		}
		return authenticated;
	}

	return (
		<View 
			style={{...styles.container, flex:1}}
		>
			<View
				style={styles.container}
			>
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
	},
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})