import React, { useEffect, useState } from "react";
import { View, ViewStyle, StyleProp } from "react-native";
import ListItem from "./listItem";
import { PLACEHOLDER_COLOR } from "../../../styles/colors";


export type Nameable = {
	name: string,
	id: number
}

type ListProps<T extends Nameable> = {
	items: Array<T>,
	style?: StyleProp<ViewStyle>,
	deleteItem: (id: number) => void,
	editItem?: (item: Nameable) => void
}

/**
 * The list component displays a list of generic items.
 * @author Zoe Bingham
 */
export default function List<T extends Nameable>(props: ListProps<T>) {
	const items = props.items;

	return (
		<View style={props.style}>
			{
				items.map( (item, index) => (
					<ListItem 
						style={{
							borderColor: PLACEHOLDER_COLOR,
							borderBottomWidth: index === items.length - 1 ? 1 : 0,
						}}
						key={(item as Nameable).id ?? index} 
						name={item.name}
						id={item.id}
						onDelete={() => props.deleteItem(item.id)}
						onEdit={props.editItem && props.editItem}
					></ListItem>
				))
			}
		</View>
	)
}