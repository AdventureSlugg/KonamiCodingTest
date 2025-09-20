import React from "react";
import { View, Text, Image } from "react-native";
import Form from "../components/form/form";

/**
 * The SignIn page component. Contains a form for users to sign in with their credentials.
 * @author Zoe Bingham
 */
export default function SignIn() {
	return (
		<View>
			{/** Logo Section */}
			<Image 
				source={require("../../assets/konami-logo.png")} 
			/>

			{/** Warning Message */}
			<Text>
				Invalid credentials, please try again.
			</Text>

			{/** Form Section */}
			<Form></Form>

			{/** Forgot Password Section */}
			<Text>
				forgot password?
			</Text>
		</View>
	);
}