/**
 * 
 */

type ScreenSize = {
	name: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	min: number;
	max: number;
};

const SCREEN_SIZES: Array<ScreenSize> = [
	{
		name: 'xs',
		min: 0,
		max: 360,
	},
	{
		name: 'sm',
		min: 361,
		max: 480,
	},
	{
		name: 'md',
		min: 481,
		max: 768,
	},
	{
		name: 'lg',
		min: 769,
		max: 1024,
	},
	{
		name: 'xl',
		min: 1025,
		max: Infinity,
	},
];

/**
 * Determines what screen size the current width falls into.
 * @param width the actual width of the screen
 * @returns 
 */
export function getScreenSize(width: number) {
	return SCREEN_SIZES.find(size => width >= size.min && width <= size.max)?.name || 'md';
}

export const PADDING_BY_SCREEN_SIZE = {
	xs: 8,
	sm: 12,
	md: 16,
	lg: 20,
	xl: 24,
};

export const FONT_SIZE_BY_SCREEN_SIZE = {
	xs: 12,
	sm: 14,
	md: 16,
	lg: 18,
	xl: 20,
};

export const ICON_SIZE_BY_SCREEN_SIZE = {
	xs: 16,
	sm: 20,
	md: 24,
	lg: 28,
	xl: 32,
};

export const BORDER_RADIUS_BY_SCREEN_SIZE = {
	xs: 4,
	sm: 6,
	md: 8,
	lg: 10,
	xl: 12,
};

export const TITLE_FONT_SIZE_BY_SCREEN_SIZE = {
	xs: 18,
	sm: 20,
	md: 22,
	lg: 24,
	xl: 26,
};
