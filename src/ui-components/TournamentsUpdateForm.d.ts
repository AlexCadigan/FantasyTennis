/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Tournaments } from "../API.ts";
export declare type EscapeHatchProps = {
	[elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
	[key: string]: string;
};
export declare type Variant = {
	variantValues: VariantValues;
	overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
	hasError: boolean;
	errorMessage?: string;
};
export declare type ValidationFunction<T> = (
	value: T,
	validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type TournamentsUpdateFormInputValues = {
	Name?: string;
	AtpID?: number;
	StartDate?: string;
	EndDate?: string;
	Location?: string;
};
export declare type TournamentsUpdateFormValidationValues = {
	Name?: ValidationFunction<string>;
	AtpID?: ValidationFunction<number>;
	StartDate?: ValidationFunction<string>;
	EndDate?: ValidationFunction<string>;
	Location?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
	React.DOMAttributes<HTMLDivElement>;
export declare type TournamentsUpdateFormOverridesProps = {
	TournamentsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
	Name?: PrimitiveOverrideProps<TextFieldProps>;
	AtpID?: PrimitiveOverrideProps<TextFieldProps>;
	StartDate?: PrimitiveOverrideProps<TextFieldProps>;
	EndDate?: PrimitiveOverrideProps<TextFieldProps>;
	Location?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TournamentsUpdateFormProps = React.PropsWithChildren<
	{
		overrides?: TournamentsUpdateFormOverridesProps | undefined | null;
	} & {
		id?: string;
		tournaments?: Tournaments;
		onSubmit?: (
			fields: TournamentsUpdateFormInputValues
		) => TournamentsUpdateFormInputValues;
		onSuccess?: (fields: TournamentsUpdateFormInputValues) => void;
		onError?: (
			fields: TournamentsUpdateFormInputValues,
			errorMessage: string
		) => void;
		onChange?: (
			fields: TournamentsUpdateFormInputValues
		) => TournamentsUpdateFormInputValues;
		onValidate?: TournamentsUpdateFormValidationValues;
	} & React.CSSProperties
>;
export default function TournamentsUpdateForm(
	props: TournamentsUpdateFormProps
): React.ReactElement;
