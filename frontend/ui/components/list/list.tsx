import React, { useState } from "react";
import { View, Text, ViewStyle, StyleProp } from "react-native";
import ListItem from "./listItem";
import { PLACEHOLDER_COLOR } from "../../../styles/colors";


type Nameable = {
	name: string
}

type ListProps<T extends Nameable> = {
	items: Array<T>,
	style?: StyleProp<ViewStyle>
}

/**
 * The list component displays a list of generic items.
 * @author Zoe Bingham
 */
export default function List<T extends Nameable>(props: ListProps<T>) {
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
		<View style={props.style}>
			{
				items.map( (item, index) => (
					<ListItem 
						style={{
							borderColor: PLACEHOLDER_COLOR,
							borderBottomWidth: index === items.length - 1 ? 1 : 0,
						}}
						key={index} 
						name={item.name}
					></ListItem>
				))
			}
		</View>
	)
}