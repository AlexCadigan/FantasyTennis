/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import Logo from "./Logo";
import { Button, Flex } from "@aws-amplify/ui-react";
export default function Header(props) {
	const { overrides, ...rest } = props;
	return (
		<Flex
			gap="10px"
			direction="row"
			width="1240px"
			height="unset"
			justifyContent="space-between"
			alignItems="center"
			overflow="hidden"
			position="relative"
			boxShadow="0px 2px 6px rgba(0.05098039284348488, 0.10196078568696976, 0.14901961386203766, 0.15000000596046448)"
			padding="16px 32px 16px 32px"
			backgroundColor="rgba(255,255,255,1)"
			{...getOverrideProps(overrides, "Header")}
			{...rest}
		>
			<Logo
				width="160px"
				height="32px"
				display="block"
				gap="unset"
				alignItems="unset"
				justifyContent="unset"
				shrink="0"
				position="relative"
				padding="0px 0px 0px 0px"
				{...getOverrideProps(overrides, "Logo")}
			></Logo>
			<Button
				width="unset"
				height="unset"
				shrink="0"
				backgroundColor="rgba(4,125,149,1)"
				size="default"
				isDisabled={false}
				variation="default"
				children="Sign out"
				{...getOverrideProps(overrides, "Sign Out")}
			></Button>
		</Flex>
	);
}
