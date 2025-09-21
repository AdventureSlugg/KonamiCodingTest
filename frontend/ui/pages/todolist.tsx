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
			name: 'Add Validation',
			id: 0
		},
		{
			name: 'Submit Form',
			id: 1
		},
		{
			name: 'Check Endpoints',
			id: 2
		}
	]);
	return (
		<View style={{flex: 1}}>
			<View style={styles.container}>
				{/** Title Section  */}
				<Text
					style={{
						...styles.title,
						fontSize: sizes.titleFontSize,
						paddingBottom: sizes.padding * 2
					}}
				>
					Todo List Page
				</Text>

				{/** List Section */}
				<List items={tasks} style={{width:'85%'}}></List>

				{/** Add item section */}
				<View 
					style={{
						...styles.horizontal,
						width: '90%',
						paddingTop: 2 * sizes.padding
					}}
				>
					<FormField 
						style={{
							marginLeft: sizes.padding,
							marginRight: sizes.padding,
							width: '75%'
						}}
						type={"text"} 
						placeholder={"Add New Task"} 
						validator={() => true} 
						onInvalidInput={() => true}>	
					</FormField>
					<Button 
						style={{
							width: '15%',
						}}
						name={"Add"} 
						onSubmit={()=> {}} >
					</Button>
				</View>
			</View>
			
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		width: '100%',
		height: '100%',
	},
	title: {
		marginTop: 50,
		fontWeight: 'bold'
	},
	horizontal: {
		flexDirection: 'row'
	}

})