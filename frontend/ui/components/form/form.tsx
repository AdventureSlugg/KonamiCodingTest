import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../button/button";
import FormField, { FormFieldType } from "./formField";
import { WARNING_COLOR } from "../../../styles/colors";

export type FormProps = {
	fields: Array<FormFieldType>;
	onSubmit: () => boolean;
	warningMessage: string;
}

/**
 * The form component is used to collect user input in a structured manner.
 * @author Zoe Bingham
 */
export default function Form(props: FormProps) {
	const [isValid, setIsValid] = React.useState(true);

	const checkSubmit = () => {
		// If the form is not valid, show the warning message
		setIsValid(props.onSubmit());
	}

	return (
		<View>
			{/** Warning Message */}
			{
				!isValid &&
					<Text
						style={styles.warningMessage}
					>
						{ props.warningMessage }
					</Text>
			}
			

			{/** Username and Password Forms */}
			{
				// For each field in the signInFields array, create a FormField component
				props.fields.map((field, index) => (
					<FormField 
						key={index} 
						{...field}
						onInvalidInput={(isValid) => setIsValid(isValid)}
					></FormField>
				))
			}

			{/** Submission Button */}
			<Button name="SIGN IN" onSubmit={() => {checkSubmit()}}></Button>
		</View>
	)
}

const styles = StyleSheet.create({
	warningMessage: {
		color: WARNING_COLOR,
		margin: 'auto',
		fontWeight: 'bold',
	},
});