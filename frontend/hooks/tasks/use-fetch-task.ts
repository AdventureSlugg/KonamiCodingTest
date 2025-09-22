import { useCallback, useState } from "react";
import { Task } from "../../ui/pages/todolist";

const mockTasks: Array<Task> = [
	{
		name: "Add Validation",
		id: 0,
	},
	{
		name: "Submit Form",
		id: 1,
	},
	{
		name: "Check Endpoints",
		id: 2,
	},
];

/**
 * Custom hook that provides the task list and CRUD actions.
 * Previously you were calling hooks at module scope which is invalid —
 * hooks must be called inside React functions. This hook fixes that.
 */
export function useFetchTasks(initial: Array<Task> = mockTasks) {
	const [tasks, setTasks] = useState<Array<Task>>(initial);

	const createTask = useCallback((task: Task) => {
		setTasks((prev) => [...prev, task]);
	}, []);

	const deleteTask = useCallback((id: number) => {
		setTasks((prev) => prev.filter((t) => t.id !== id));
	}, []);

	const updateTask = useCallback((id: number, newValue: string) => {

		setTasks((prev) =>
			prev.map((t) => (t.id === id ? { ...t, name: newValue } : t))
		);
	}, []);

	return { tasks, createTask, deleteTask, updateTask };
}