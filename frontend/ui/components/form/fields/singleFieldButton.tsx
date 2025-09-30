import React, { useState } from "react";
import FormField from "../../../components/form/formField";
import Button from "../../../components/button/button";
import { View } from "react-native";
import { Nameable } from "../../list/list";
import { useSizeScheme } from "../../../../hooks/use-size-scheme";

export type SingFieldFormProps<T extends Nameable> = {
	placeHolder: string,
	buttonName: string,
	submitAction: (data: Nameable) => void
}

export function SingleFieldForm<T extends Nameable> (props: SingFieldFormProps<T>) {
	const [newText, setNewText] = useState<string>("");
	const sizes = useSizeScheme();

	return (
		<View
			style={{
				display: 'flex',
				flexDirection: 'row'
			}}
		>
			<FormField 
				style={{
					marginLeft: sizes.padding,
					marginRight: sizes.padding,
					width: '75%'
				}}
				type={"text"} 
				placeholder={props.placeHolder} 
				validator={() => true} 
				onValueChange={(input) => setNewText(input)}
				onInvalidInput={() => true}>
			</FormField>
			<Button 
				style={{
					width: '15%',
				}}
				name={props.buttonName} 
				onSubmit={()=> { 
					if (newText.trim()) { 
						props.submitAction({ 
							name: newText.trim() 
						}); 
						setNewText("");
					}
				}} >
			</Button>
		</View>
	)
}