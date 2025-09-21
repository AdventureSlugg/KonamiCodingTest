import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { PLACEHOLDER_COLOR, WARNING_COLOR } from "../../../styles/colors";
import { useSizeScheme } from "../../../hooks/use-size-scheme";

type ListItemProps = {
	name: string,
	style?: StyleProp<ViewStyle>
}

/**
 * The list item component displays a single item of a list.
 * @author Zoe Bingham
 */

export default function ListItem<T>(props: ListItemProps) {
	const size = useSizeScheme();

	return (
		<View style={props.style}>
			{
				props.name &&
				<View
					style={{
						...styles.listItem,
						height: size.fontSize * 4,
						paddingTop: 1.5 * size.padding

					}}
				>
					<Text>
						{props.name}
					</Text>
					<TouchableOpacity
						style={
							styles.hugRight
						}
					>
						<Text style={styles.delete}>DELETE</Text>
					</TouchableOpacity>
				</View>
			}
		</View>
	)
}

const styles = StyleSheet.create({
	listItem: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		borderColor: PLACEHOLDER_COLOR,
		borderTopWidth: 1,
	},
	delete: {
		color: WARNING_COLOR,
		fontWeight: 'bold'
	},
	hugRight: {
		marginRight: '3%',
		marginLeft: 'auto'
	}
})