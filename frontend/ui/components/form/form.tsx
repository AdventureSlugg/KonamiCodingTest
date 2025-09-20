import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../button/button";
import FormField, { FormFieldProps } from "./formField";

/**
 * The form component is used to collect user input in a structured manner.
 * @author Zoe Bingham
 */
export default function Form() {
	const signInFields: Array<FormFieldProps> = [
		{ type: "text", placeholder: "Username" },
		{ type: "password", placeholder: "Password" }
	]

	const submitForm = () => {
		// TODO submit form logic
		console.log('Submitted');
	}

	return (
		<View>
			{/** Username and Password Forms */}
			{
				// For each field in the signInFields array, create a FormField component
				signInFields.map((field, index) => (
					<FormField key={index} {...field}></FormField>
				))
			}

			{/** Submission Button */}
			<Button name="SIGN IN" onSubmit={() => {submitForm()}}></Button>
		</View>
	)
}
