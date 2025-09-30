import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { PLACEHOLDER_COLOR, WARNING_COLOR } from "../../../styles/colors";
import { useSizeScheme } from "../../../hooks/use-size-scheme";
import FormField from "../form/formField";
import List, { Nameable } from "./list";

export type ListItem = {
	name: string,
	parentID?: number,
	subItems?: Map<number, ListItem>
}

type ListItemProps = {
	id: number,
	item: ListItem,
	style?: StyleProp<ViewStyle>,
	onDelete: (id: number, parentID?: number) => void,
	onEdit: (id: number, item: Nameable, parentID?: number) => void
}

/**
 * The list item component displays a single item of a list.
 * @author Zoe Bingham
 */

export default function ListItem(props: ListItemProps) {
	const size = useSizeScheme();
	const [editing, setEditing] = useState(false);
	const [newName, setNewName] = useState(props.item.name);

	return (
		<View style={props.style}>
			{
				props.item.name &&
				<View
					style={{
						...styles.listItem,
						height: size.fontSize * 4,
						margin: 'auto'
					}}
				>
					{
						!editing ?
							<Text
								style={{
									...styles.hugLeft,
									zIndex: -5
								}}
							>
								{props.item.name}
							</Text>
						:
							<FormField 
								type={"text"} 
								placeholder={props.item.name}
								onFinish={() => {
									if (props.onEdit) props.onEdit(
										props.id, 
										{
											name: newName
										}
									)
								}}
								onValueChange={setNewName}
								style={{
									paddingTop: size.padding * 1/4
								}}
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

					<TouchableOpacity
						style={{
							width: '100%',
							height: '100%',
							position: 'absolute',
							zIndex: -1
						}}
						onPress={() => {
							setEditing(!editing)
						}}>
					</TouchableOpacity>
				</View>
			}

			{
				props.item.subItems ?
					<List 
						items={props.item.subItems}
						deleteItem={(id) => props.onDelete(props.id, id)} 
						editItem={(id, item) => props.onEdit(props.id, item, id)}
						style={{
							paddingLeft: '5%'
						}}>
					</List>
					:
					<></>
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
		marginLeft: 'auto',
		marginTop: 'auto',
		marginBottom: 'auto'
	},
	hugLeft: {
		marginLeft: '3%',
		marginRight: 'auto',
		marginTop: 'auto',
		marginBottom: 'auto'
	}
})