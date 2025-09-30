import React from "react";
import { View, ViewStyle, StyleProp } from "react-native";
import ListItem from "./listItem";
import { PLACEHOLDER_COLOR } from "../../../styles/colors";
import { SingleFieldForm } from "../form/fields/singleFieldButton";

export type Nameable = {
	name: string,
}

type ListProps<T extends Nameable> = {
	items: Map<number, T>,
	style?: StyleProp<ViewStyle>,
	depth: number,
	path?: number[],
	deleteItem: (path: number[]) => void,
	editItem: (path: number[], item: Nameable) => void,
	addItem: (item: Nameable, parentPath?: number[]) => void
}

/**
 * The list component displays a list of generic items.
 * @author Zoe Bingham
 */
export default function List<T extends Nameable>(props: ListProps<T>) {
	const items = props.items;
	const parentPath = props.path ?? [];

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
					path={[...parentPath, id]}
					onDelete={props.deleteItem}
					onEdit={props.editItem}
					addItem={props.addItem}
					depth={props.depth}
					>
				</ListItem>
			)
		})

		return listElements
	}

	return (
		<View style={[{ flex: 1 }, props.style]}>
			{
				renderList()
			}
			<SingleFieldForm 
				placeHolder={"Add new Task"} 
				buttonName={"Add"} 
				submitAction={(item: Nameable) => props.addItem(item, parentPath)}
			>
			</SingleFieldForm>
		</View>
	)
}

