import { useCallback, useState } from "react";
import { ListItem } from "../../ui/components/list/listItem";

/**
 * A task is composed of a name and sub tasks.
 */
export type Task = ListItem;

const mockTasks = new Map<number, Task>();
const subTasks = new Map<number, Task>();
const subTasks2 = new Map<number, Task>();

subTasks.set(3, {
	name: "validate child 1",
	parentID: 0,
	subItems: subTasks2
})
subTasks2.set(4, {
	name: "validate child 2",
	parentID: 0
})


// Initialize the mockData
mockTasks.set(0, {
	name: "Add Validation",
	subItems: subTasks
});
mockTasks.set(1, {
	name: "Submit Form",
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

	/**
	 * Gets the child task at a given path.
	 * @param root The startinf point
	 * @param path The path to the child task
	 * @returns 
	 */
	const getTaskAtPath = (root: Map<number, Task>, path: number[]) : Task | undefined => {
		if (!path || path.length === 0) return undefined;
		let current: Task | undefined;
		let currentMap = root;

		for (let i = 0; i < path.length; i++) {
			const seg = path[i];
			current = currentMap.get(seg);
			if (!current) return undefined;
			if (i === path.length - 1) return current;
			if (!current.subItems) return undefined;
			currentMap = current.subItems as Map<number, Task>;
		}
		return undefined;
	};


	/**
	 * Find the place to add the task. Given a operation parameter, update or delete the node at the given path.
	 * @param root 
	 * @param path 
	 * @param operation 
	 * @param value 
	 * @returns 
	 */
	const mutateAtPath = (root: Map<number, Task>, path: number[], operation: 'set' | 'delete', value?: Task) => {
		// Copy the root map
		const newRoot = new Map(root);

		// Recursive exit condition when we get to the top.
		if (!path || path.length === 0) {
			return newRoot;
		}

		// If path is length 1, operate directly on root
		if (path.length === 1) {
			const key = path[0];
			if (operation === 'delete') {
				newRoot.delete(key);
			} else if (operation === 'set' && value) {
				newRoot.set(key, value);
			}
			return newRoot;
		}

		// Otherwise, make copies of the maps along the way until we get to where mutation will be made.
		const mapsStack: Array<{ map: Map<number, Task>, key: number }> = [];
		let currentMap = newRoot;
		for (let i = 0; i < path.length - 1; i++) {
			const key = path[i];
			const item = currentMap.get(key);
			// If no further depth, return to previous root
			if (!item) {
				return root;
			}

			const copiedItem: Task = { ...item };
			// If subitems exists, copy subItems them.
			if (item.subItems) {
				const copiedSub = new Map(item.subItems as Map<number, Task>);
				copiedItem.subItems = copiedSub;
			}

			currentMap.set(key, copiedItem);

			mapsStack.push({ map: currentMap, key });

			// If there are no more subItems, return to previoous root.
			if (!copiedItem.subItems) {
				return root;
			}
			currentMap = copiedItem.subItems as Map<number, Task>;
		}

		// Perform the mutation on the final map.
		const finalKey = path[path.length - 1];
		if (operation === 'delete') {
			currentMap.delete(finalKey);
		} else if (operation === 'set' && value) {
			currentMap.set(finalKey, value);
		}

		return newRoot;
	};

	/**
	 * Recursively create a new child task from the parents
	 * @param root 
	 * @param parentPath 
	 * @param childKey 
	 * @param childValue 
	 * @returns 
	 */
	const setChildAtPath = (root: Map<number, Task>, parentPath: number[], childKey: number, childValue: Task) => {
		// Copy root
		const newRoot = new Map(root);

		// Set exit condition when we reach the top depth
		if (!parentPath || parentPath.length === 0) {
			newRoot.set(childKey, childValue);
			return newRoot;
		}

		let currentMap = newRoot;
		// Follow map and copy children to make mutation
		for (let i = 0; i < parentPath.length; i++) {
			const key = parentPath[i];
			const item = currentMap.get(key);

			// If there is no item, go back to previous root
			if (!item) {
				return root;
			}

			const copiedItem: Task = { ...item };
			if (item.subItems) {
				// If children exist, copy them.
				copiedItem.subItems = new Map(item.subItems as Map<number, Task>);
			} else {
				// When there are no children, create new children
				copiedItem.subItems = new Map<number, Task>();
			}

			currentMap.set(key, copiedItem);

			currentMap = copiedItem.subItems as Map<number, Task>;
		}

		// Now currentMap is the subItems map of the node at parentPath
		currentMap.set(childKey, childValue);
		return newRoot;
	};

	/**
	 * Create a new task at the root or under a given parent
	 */
	const createTask = useCallback((task: Task, parent?: number | number[]) => {
		setTasks(prevTasks => {
			const newCount = count + 1;

			// If parent is an array path
			if (Array.isArray(parent)) {
				// If we are at root, then just set the newTasks and exit
				if (parent.length === 0) {
					const newTasks = new Map(prevTasks);
					newTasks.set(newCount, task);
					setCount(newCount);
					return newTasks;
				}

				// Insert child under the task at the given parent path (one layer deeper)
				const newTasks = setChildAtPath(prevTasks, parent, newCount, task);
				setCount(newCount);
				return newTasks;
			}

			// If onl 1 parent, directly add.
			const newTasks = new Map(prevTasks);
			if (parent === 0 || (typeof parent === 'number' && parent)) {
				newTasks.get(parent as number)?.subItems?.set(newCount, task);
			} else {
				newTasks.set(newCount, task);
			}

			setCount(newCount);
			return newTasks;
		});
	}, [count]);

	/**
	 * Delete by path or by id/childID
	 */
	const deleteTask = useCallback((idOrPath: number | number[], childID?: number) => {
		setTasks(prevTasks => {
			// If given a path, find and delete the task.
			if (Array.isArray(idOrPath)) {
				const newTasks = mutateAtPath(prevTasks, idOrPath, 'delete');
				return newTasks;
			}

			// If the task is a child and the id is a number, we can delete it directly from the map.
			const newTasks = new Map(prevTasks);
			if (childID === 0 || childID) {
				newTasks.get(idOrPath as number)?.subItems?.delete(childID as number);
			} else {
				// If it's the parent, just delete it from the top level
				newTasks.delete(idOrPath as number);
			}
			return newTasks;
		})
	}, []);

	/**
	 * Update by path or by id/childID
	 */
	const updateTask = useCallback((idOrPath: number | number[], newValue: Task, childID?: number) => {
		setTasks(prevTasks => {
			if (Array.isArray(idOrPath)) {
				const newTasks = mutateAtPath(prevTasks, idOrPath, 'set', newValue);
				return newTasks;
			}

			const newTasks = new Map(prevTasks);
			if (childID === 0 || childID) {
				newTasks.get(idOrPath as number)?.subItems?.set(childID as number, newValue);
			} else {
				newTasks.set(idOrPath as number, newValue);
			}
			return newTasks;
		})
        
	}, []);

	return { tasks, createTask, deleteTask, updateTask, getTaskAtPath };
}