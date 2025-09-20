import { useWindowDimensions } from "react-native";
import { BORDER_RADIUS_BY_SCREEN_SIZE, getScreenSize, PADDING_BY_SCREEN_SIZE, TITLE_FONT_SIZE_BY_SCREEN_SIZE } from "../styles/screenSizes";

export function useSizeScheme() {
	const { width } = useWindowDimensions();

	// Get the device size category ('sm', 'md', 'lg', etc.) based on the current width
	const deviceSize = getScreenSize(width);

	// Placeholder for size scheme logic
	return {
		padding: PADDING_BY_SCREEN_SIZE[deviceSize],
		fontSize: PADDING_BY_SCREEN_SIZE[deviceSize],
		iconSize: PADDING_BY_SCREEN_SIZE[deviceSize],
		borderRadiusSize: BORDER_RADIUS_BY_SCREEN_SIZE[deviceSize],
		titleFontSize: TITLE_FONT_SIZE_BY_SCREEN_SIZE[deviceSize],
	};
}