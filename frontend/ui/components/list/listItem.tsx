import React from "react";
import { View, Text } from "react-native";

type ListItemProps = {
	name: string
}

/**
 * The list item component displays a single item of a list.
 * @author Zoe Bingham
 */

export default function ListItem<T>(props: ListItemProps) {
	return (
		<View>
			{
				props.name &&
				<Text>
					{props.name}
				</Text>
			}
			<Text></Text>
		</View>
	)
}