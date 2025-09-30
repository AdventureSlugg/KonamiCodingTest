import React from "react";
import { View, ViewStyle, StyleProp } from "react-native";
import ListItem from "./listItem";
import { PLACEHOLDER_COLOR } from "../../../styles/colors";

export type Nameable = {
	name: string,
}

type ListProps<T extends Nameable> = {
	items: Map<number, T>,
	style?: StyleProp<ViewStyle>,
	deleteItem: (id: number, parentId?: number) => void,
	editItem: (id: number, item: Nameable, parentId?: number) => void
}

/**
 * The list component displays a list of generic items.
 * @author Zoe Bingham
 */
export default function List<T extends Nameable>(props: ListProps<T>) {
	const items = props.items;

	/**
	 * Creates a list of JSX Elements from the passed in items.
	 * @returns 
	 */
	const renderList = (): Array<React.JSX.Element> => {
		const listElements: Array<React.JSX.Element> = [];

		// Add each element to the List
		items.forEach( (item, id) => {
			listElements.push(
				<ListItem
					style={{
						borderColor: PLACEHOLDER_COLOR,
						borderBottomWidth: id === items.size - 1 ? 1 : 0,
					}}
					id={id}
					key={id} 
					item={item}
					onDelete={props.deleteItem}
					onEdit={props.editItem}>
				</ListItem>
			)
		})

		return listElements
	}

	return (
		<View style={props.style}>
			{
				renderList()
			}
		</View>
	)
}

