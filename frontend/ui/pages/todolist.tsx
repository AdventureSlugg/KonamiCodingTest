import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import List from "../components/list/list";
import { useSizeScheme } from "../../hooks/use-size-scheme";

import { useFetchTasks } from "../../hooks/tasks/use-fetch-task";

/**
 * The TodoList page component. Contains a list of todo items and allows users to add, edit, and delete items.
 * @author Zoe Bingham
 */
export default function TodoList() {
	const sizes = useSizeScheme();
	const { tasks, createTask, deleteTask, updateTask } = useFetchTasks();
	
	return (
		<View style={{flex: 1}}>
			<ScrollView contentContainerStyle={styles.container}>
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
					editItem={updateTask}
					addItem={createTask}
					depth={1}
				></List>

				{/** Add item section */}
				<View 
					style={{
						...styles.horizontal,
						width: '90%',
						paddingTop: 2 * sizes.padding
					}}
				>
				</View>
			</ScrollView>
			
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		width: '100%',
		flexGrow: 1,
		height: 1, // Percent height doesn't allow scroll.
	},
	title: {
		marginTop: 50,
		fontWeight: 'bold'
	},
	horizontal: {
		flexDirection: 'row'
	}

})