/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import Header from "./Header";
import { View } from "@aws-amplify/ui-react";
export default function Homepage(props) {
	const { overrides, ...rest } = props;
	return (
		<View
			width="1280px"
			height="832px"
			display="block"
			gap="unset"
			alignItems="unset"
			justifyContent="unset"
			overflow="hidden"
			position="relative"
			padding="0px 0px 0px 0px"
			backgroundColor="rgba(255,255,255,1)"
			{...getOverrideProps(overrides, "Homepage")}
			{...rest}
		>
			<Header
				display="flex"
				gap="10px"
				direction="row"
				width="1265px"
				height="unset"
				justifyContent="space-between"
				alignItems="center"
				overflow="hidden"
				position="absolute"
				top="8px"
				left="calc(50% - 632.5px - 0.5px)"
				boxShadow="0px 2px 6px rgba(0.05098039284348488, 0.10196078568696976, 0.14901961386203766, 0.15000000596046448)"
				padding="16px 32px 16px 32px"
				backgroundColor="rgba(255,255,255,1)"
				{...getOverrideProps(overrides, "Header")}
			></Header>
		</View>
	);
}
