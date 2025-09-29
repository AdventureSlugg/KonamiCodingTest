import { useCallback, useState } from "react";

/**
 * A task is composed of a name and sub tasks.
 */
export type Task = {
	name: string,
	subTasks?: Map<number, Task>
}

const mockTasks = new Map<number, Task>();

// Initialize the mockData
mockTasks.set(0, {
	name: "Add Validation",
});
mockTasks.set(1, {
	name: "Submit Form"
});
mockTasks.set(2, {
	name: "Check Endpoints"
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

	const deleteTask = useCallback((id: number) => {
		setTasks(prevTasks => {
			const newTasks = new Map(prevTasks);
			newTasks.delete(id);
			return newTasks;
		})
	}, []);

	const updateTask = useCallback((id: number, newValue: Task) => {
		setTasks(prevTasks => {
			const newTasks = new Map(prevTasks);
			newTasks.set(id, newValue);
			return newTasks;
		})
		
	}, []);

	return { tasks, createTask, deleteTask, updateTask };
}