import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import List from "../components/list/list";
import { useSizeScheme } from "../../hooks/use-size-scheme";
import FormField from "../components/form/formField";
import Button from "../components/button/button";

type Task = {
	name: string,
	id: number
}

/**
 * The TodoList page component. Contains a list of todo items and allows users to add, edit, and delete items.
 * @author Zoe Bingham
 */
export default function TodoList() {
	const sizes = useSizeScheme();
	const [tasks, setTasks] = useState<Array<Task>>([
		{
			name: 't1',
			id: 1
		},
		{
			name: 't1',
			id: 1
		}
	]);
	return (
		<View style={{flex: 1, marginTop: 40, width: '90%', marginLeft: 'auto', marginRight: 'auto'}}>
			<View style={styles.container}>
				{/** Title Section  */}
				<Text
					style={{
						...styles.title,
						fontSize: sizes.titleFontSize,

					}}
				>
					Todo List Page
				</Text>

				{/** List Section */}
				<List items={tasks}></List>

				{/** Add item section */}
				<View 
					style={{
						...styles.horizontal,
						width: '90%'
					}}
				>
					<FormField 
						style={{
							marginLeft: sizes.padding,
							marginRight: sizes.padding,
							width: '80%'
						}}
						type={"text"} 
						placeholder={"Add New Task"} 
						validator={() => true} 
						onInvalidInput={() => true}>	
					</FormField>
					<Button 
						style={{
							width: '20%'
						}}
						name={"Add"} 
						onSubmit={()=> {}} ></Button>
				</View>
			</View>
			
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		width: '90%'
	},
	title: {
		fontWeight: 'bold'
	},
	horizontal: {
		flexDirection: 'row'
	}

})