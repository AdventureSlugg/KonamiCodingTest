import { useCallback, useState } from "react";
import { ListItem } from "../../ui/components/list/listItem";

/**
 * A task is composed of a name and sub tasks.
 */
export type Task = ListItem;

const mockTasks = new Map<number, Task>();
const subTasks = new Map<number, Task>();
subTasks.set(3, {
	name: "validate",
	parentID: 0
})

// Initialize the mockData
mockTasks.set(0, {
	name: "Add Validation",
	subItems: subTasks
});
mockTasks.set(1, {
	name: "Submit Form"
});
mockTasks.set(2, {
	name: "Check Endpoints",
});


/**
 * A hook to perform CRUD operations on Tasks. Returns the tasks, and modifiers.
 */
export function useFetchTasks(initial: Map<number, Task> = mockTasks) {
	const [tasks, setTasks] = useState<Map<number, Task>>(new Map(initial));
	const [count, setCount] = useState<number>(initial.size);
	

	const createTask = useCallback((task: Task) => {
		setTasks(prevTasks => {
			const newTasks = new Map(prevTasks);
			const newCount = count + 1;
			newTasks.set(newCount, task);
			setCount(newCount);
			return newTasks;
		});
	}, [count]);

	const deleteTask = useCallback((id: number, childID?: number) => {
		setTasks(prevTasks => {
			const newTasks = new Map(prevTasks);

			// If the item is a child item, delete it from the subtasks
			if (childID) {
				newTasks.get(id)?.subItems?.delete(childID);
			} else {
				newTasks.delete(id);
			}
			
			return newTasks;
		})
	}, []);

	const updateTask = useCallback((id: number, newValue: Task, childID?: number) => {
		setTasks(prevTasks => {
			const newTasks = new Map(prevTasks);
			
			// If the item is a child item, edit it from the subtasks
			if (childID) {
				newTasks.get(id)?.subItems?.set(childID, newValue)
			} else {
				newTasks.set(id, newValue);
			}
			return newTasks;
		})
		
	}, []);

	return { tasks, createTask, deleteTask, updateTask };
}