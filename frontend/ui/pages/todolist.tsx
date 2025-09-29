import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import List from "../components/list/list";
import { useSizeScheme } from "../../hooks/use-size-scheme";
import FormField from "../components/form/formField";
import Button from "../components/button/button";
import { useFetchTasks } from "../../hooks/tasks/use-fetch-task";

/**
 * The TodoList page component. Contains a list of todo items and allows users to add, edit, and delete items.
 * @author Zoe Bingham
 */
export default function TodoList() {
	const sizes = useSizeScheme();
	const { tasks, createTask, deleteTask, updateTask } = useFetchTasks();
	const [newTaskName, setNewTaskName] = useState<string>("");
	
	return (
		<View style={{flex: 1}}>
			<View style={styles.container}>
				{/** Title Section  */}
				<Text
					style={{
						...styles.title,
						fontSize: sizes.titleFontSize * 1.5,
						paddingBottom: sizes.padding * 2
					}}
				>
					To Do List
				</Text>

				{/** List Section */}
				<List 
					items={tasks} 
					style={{width:'85%'}} 
					deleteItem={deleteTask}
					editItem={ (id, task) => updateTask(id, task) }
				></List>

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
						onValueChange={(input) => setNewTaskName(input)}
						onInvalidInput={() => true}>
					</FormField>
					<Button 
						style={{
							width: '15%',
						}}
						name={"Add"} 
						onSubmit={()=> { 
							if (newTaskName.trim()) { 
								createTask({ 
									name: newTaskName.trim() 
								}); 
								setNewTaskName("");
							}
						}} >
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