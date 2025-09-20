
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { PRIMARY_COLOR } from "../../../styles/colors";
import { useSizeScheme } from "../../../hooks/use-size-scheme";

export type ButtonProps = {
	name: string;
	onSubmit: () => void;
	disabled?: boolean;
}

/**
 * The button component is used to render a button in the app.
 * @author Zoe Bingham
 */
export default function Button(props: ButtonProps) {
	const sizes = useSizeScheme();
	
	return (
		<TouchableOpacity
			style={{
				...styles.button,
				padding: sizes.padding * .75,
				marginVertical: sizes.padding * .5,
				opacity: props.disabled ? 0.5 : 1,
			}}
			onPress={props.onSubmit}
			disabled={props.disabled}
		>
			<Text style={styles.buttonText}>{props.name}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: PRIMARY_COLOR,
		borderRadius: 2,
		color: 'white',
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
	}
})