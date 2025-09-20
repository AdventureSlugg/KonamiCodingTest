import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { PLACEHOLDER_COLOR } from "../../../styles/colors";
import { useSizeScheme } from "../../../hooks/use-size-scheme";

export type FormFieldProps = {
	type: "text" | "password";
	placeholder: string;
	// TODO add validator...
}

/**
 * The FormField component represents a single field within a form.
 * @author Zoe Bingham
 */
export default function FormField(field: FormFieldProps) {
	const sizes = useSizeScheme();
	const [value, setValue] = React.useState("");

	return (
		<View>
			<TextInput
				placeholder={field.placeholder}
				secureTextEntry={field.type === "password"}
				style={{
					...styles.input,
					fontSize: sizes.fontSize,
					borderRadius: 5,
					padding: sizes.padding * .5,
					paddingLeft: sizes.padding,
					marginVertical: sizes.padding * .5,
					color: value ? 'black' : PLACEHOLDER_COLOR,
				}}
				onChangeText={setValue}
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