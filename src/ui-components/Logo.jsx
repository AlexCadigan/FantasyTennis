/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Icon, Text, View } from "@aws-amplify/ui-react";
export default function Logo(props) {
	const { overrides, ...rest } = props;
	return (
		<View
			width="160px"
			height="32px"
			display="block"
			gap="unset"
			alignItems="unset"
			justifyContent="unset"
			position="relative"
			padding="0px 0px 0px 0px"
			{...getOverrideProps(overrides, "Logo")}
			{...rest}
		>
			<Icon
				width="20%"
				height="100%"
				viewBox={{ minX: 0, minY: 0, width: 32, height: 32 }}
				paths={[
					{ d: "M0 0L32 0L32 32L0 32L0 0Z", fillRule: "nonzero" }
				]}
				display="block"
				gap="unset"
				alignItems="unset"
				justifyContent="unset"
				position="absolute"
				top="0%"
				bottom="0%"
				left="0%"
				right="80%"
				{...getOverrideProps(overrides, "Icon")}
			></Icon>
			<Text
				fontFamily="Inter"
				fontSize="18px"
				fontWeight="400"
				color="rgba(13,26,38,1)"
				lineHeight="27px"
				textAlign="left"
				display="block"
				direction="column"
				justifyContent="unset"
				width="unset"
				height="unset"
				gap="unset"
				alignItems="unset"
				position="absolute"
				top="9.38%"
				bottom="6.25%"
				left="24.38%"
				right="-4.37%"
				padding="0px 0px 0px 0px"
				whiteSpace="pre-wrap"
				children="Fantasy Tennis"
				{...getOverrideProps(overrides, "Fantasy Tennis")}
			></Text>
		</View>
	);
}
