/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type TournamentsCreateFormInputValues = {
	Name?: string;
	AtpID?: number;
	StartDate?: string;
	EndDate?: string;
	Location?: string;
};
export declare type TournamentsCreateFormValidationValues = {
	Name?: ValidationFunction<string>;
	AtpID?: ValidationFunction<number>;
	StartDate?: ValidationFunction<string>;
	EndDate?: ValidationFunction<string>;
	Location?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
	React.DOMAttributes<HTMLDivElement>;
export declare type TournamentsCreateFormOverridesProps = {
	TournamentsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
	Name?: PrimitiveOverrideProps<TextFieldProps>;
	AtpID?: PrimitiveOverrideProps<TextFieldProps>;
	StartDate?: PrimitiveOverrideProps<TextFieldProps>;
	EndDate?: PrimitiveOverrideProps<TextFieldProps>;
	Location?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TournamentsCreateFormProps = React.PropsWithChildren<
	{
		overrides?: TournamentsCreateFormOverridesProps | undefined | null;
	} & {
		clearOnSuccess?: boolean;
		onSubmit?: (
			fields: TournamentsCreateFormInputValues
		) => TournamentsCreateFormInputValues;
		onSuccess?: (fields: TournamentsCreateFormInputValues) => void;
		onError?: (
			fields: TournamentsCreateFormInputValues,
			errorMessage: string
		) => void;
		onChange?: (
			fields: TournamentsCreateFormInputValues
		) => TournamentsCreateFormInputValues;
		onValidate?: TournamentsCreateFormValidationValues;
	} & React.CSSProperties
>;
export default function TournamentsCreateForm(
	props: TournamentsCreateFormProps
): React.ReactElement;
