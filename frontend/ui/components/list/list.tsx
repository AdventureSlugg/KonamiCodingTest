import React, { useState } from "react";
import { View, Text } from "react-native";
import ListItem from "./listItem";


type ListProps<T> = {
	items: Array<T>
}

/**
 * The list component displays a list of generic items.
 * @author Zoe Bingham
 */
export default function List<T>(props: ListProps<T>) {
	const [items, setItems] = useState<Array<T>>(props.items);

	/**
	 * Append a new item to the items list
	 * @param item 
	 */
	const addItem = (item: T) => {
		setItems([...items, item]);
	}

	/**
	 * Remove an item from the list by the index.
	 * @param index 
	 */
	const removeItem = (index: number) => {
		const updatedItems = items.filter( (item, i ) => index != i);
		setItems(updatedItems);
	}

	return (
		<View>
			{
				items.map( (item, index) => (
					<ListItem></ListItem>
				))
			}
		</View>
	)
}