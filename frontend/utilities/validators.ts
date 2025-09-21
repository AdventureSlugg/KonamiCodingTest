/**
 * Returns true if the input string contains only valid characters (alphanumeric), false otherwise.
 * @param input - the input string to check
 * @returns 
 */
export const isAlphaNumeric = (input: string): boolean => {
	const regex = /^[a-zA-Z0-9]*$/;
	return regex.test(input);
}
