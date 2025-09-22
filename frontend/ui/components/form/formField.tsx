import React from "react";
import { View, TextInput, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { PLACEHOLDER_COLOR } from "../../../styles/colors";
import { useSizeScheme } from "../../../hooks/use-size-scheme";

export type FormFieldType = {
	type: "text" | "password";
	placeholder: string;
	validator: (input: string) => boolean;
}

export type FormFieldProps = {
	type: "text" | "password";
	placeholder: string;
	validator?: (input: string) => boolean;
	onInvalidInput?: (isValid: boolean) => void;
	onValueChange?: (value: string) => void;
	style?: StyleProp<ViewStyle>;
	onFinish?: () => void;
}

/**
 * The FormField component represents a single field within a form.
 * @author Zoe Bingham
 */
export default function FormField(props: FormFieldProps) {
	const sizes = useSizeScheme();
	const [value, setValue] = React.useState("");

	/**
	 * Checks to make sure the input is valid according to the validator function
	 * @param input 
	 * @returns 
	 */
	const checkValid = (input: string): boolean => {
		// Update the value
		setValue(input);

		// Notify parent of the value change (if provided)
		if (props.onValueChange) props.onValueChange(input);

		// Check if the input is valid
		const isValid = props.validator ? props.validator(input) : true;

		// Update the parent component about the validity
		if (props.onInvalidInput) props.onInvalidInput(isValid);

		return isValid;
	};

	return (
		<View style={props.style}>
			<TextInput
				placeholder={props.placeholder}
				secureTextEntry={props.type === "password"}
				style={{
					...styles.input,
					fontSize: sizes.fontSize,
					borderRadius: 5,
					padding: sizes.padding * .5,
					paddingLeft: sizes.padding,
					marginVertical: sizes.padding * .5,
					color: value ? 'black' : PLACEHOLDER_COLOR,
				}}
				onChangeText={checkValid}
				onBlur={props.onFinish}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	input: {
		borderColor: PLACEHOLDER_COLOR,
		color: PLACEHOLDER_COLOR,
		borderWidth: 1,
		backgroundColor: 'white',
	}
})