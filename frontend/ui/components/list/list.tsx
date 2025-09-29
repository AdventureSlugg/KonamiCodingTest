import React, { useEffect, useState } from "react";
import { View, ViewStyle, StyleProp } from "react-native";
import ListItem from "./listItem";
import { PLACEHOLDER_COLOR } from "../../../styles/colors";

export type Nameable = {
	name: string,
}

type ListProps<T extends Nameable> = {
	items: Map<number, T>,
	style?: StyleProp<ViewStyle>,
	deleteItem: (id: number) => void,
	editItem?: (id: number, item: Nameable) => void
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
					key={id} 
					name={item.name}
					id={id}
					onDelete={() => props.deleteItem(id)}
					onEdit={props.editItem && props.editItem}>
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

