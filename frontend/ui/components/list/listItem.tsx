import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { PLACEHOLDER_COLOR, WARNING_COLOR } from "../../../styles/colors";
import { useSizeScheme } from "../../../hooks/use-size-scheme";
import FormField from "../form/formField";
import { Nameable } from "./list";

type ListItemProps = {
	name: string,
	id: number,
	style?: StyleProp<ViewStyle>,
	onDelete?: (id: number) => void,
	onEdit?: (item: Nameable) => void
}

/**
 * The list item component displays a single item of a list.
 * @author Zoe Bingham
 */

export default function ListItem(props: ListItemProps) {
	const size = useSizeScheme();
	const [editing, setEditing] = useState(false);
	const [newName, setNewName] = useState(props.name);

	return (
		<View style={props.style}>
			{
				props.name &&
				<TouchableOpacity
					style={{
						...styles.listItem,
						height: size.fontSize * 4,
						paddingTop: !editing ? 1.5 * size.padding : size.padding * .5
					}}
					onPress={() => {
						setEditing(!editing)
						
					}}
				>
					{
						!editing ?
							<Text
								style={styles.hugLeft}
							>
								{props.name}
							</Text>
						:
							<FormField 
								type={"text"} 
								placeholder={props.name}
								onFinish={() => {
									if (props.onEdit) props.onEdit({
										id: props.id,
										name: newName
									})
								}}
								onValueChange={setNewName}
							></FormField>

					}
					
						
					<TouchableOpacity
						style={
							styles.hugRight
						}
						onPress={() => {
							if (props.onDelete) props.onDelete(props.id)
						}}
					>
						<Text style={styles.delete}>DELETE</Text>
					</TouchableOpacity>
				</TouchableOpacity>
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
	},
	hugLeft: {
		marginLeft: '3%',
		marginRight: 'auto'
	}
})