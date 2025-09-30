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
	path?: number[],
	style?: StyleProp<ViewStyle>,
	depth: number,
	onDelete: (path: number[]) => void,
	onEdit: (path: number[], item: Nameable) => void,
	addItem: (item: Nameable, parentPath?: number[]) => void,
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
										(props.path ?? [props.id]),
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
							if (props.onDelete) props.onDelete(props.path ?? [props.id])
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
				<List 
					items={props.item.subItems ? props.item.subItems : new Map()}
					path={props.path ?? [props.id]}
					deleteItem={props.onDelete}
					editItem={props.onEdit}
					addItem={props.addItem}
					depth={props.depth + 1}
					style={{
						paddingLeft: `${5 * (props.depth)}%`
					}}>
				</List>
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