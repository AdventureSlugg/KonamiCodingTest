import { useCallback, useState } from "react";

/**
 * UserAuth is the object that specifies that data needed for signing in
 */
export type UserAuth = {
	username: string,
	password: string
}

const mockUsers: Array<UserAuth> = [
	{
		username: "Konami",
		password: "ILikeCats123"
	},
	{
		username: "VerySecure",
		password: "password"
	},
	{
		username: "Name",
		password: "123"
	}
]

export function useAuth (initial: Array<UserAuth> = mockUsers) {
	const [users, setUsers] = useState<Array<UserAuth>>(initial);
	
	const authenticateUser = useCallback((credentials: UserAuth) => {
		// Check if there are any users with a given username password combination
		return users.some(user =>
			user.username === credentials.username && 
			user.password === credentials.password);
		}, 
	[]);

	return { authenticateUser }
}