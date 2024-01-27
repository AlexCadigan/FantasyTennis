/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createTournaments } from "../graphql/mutations";
const client = generateClient();
export default function TournamentsCreateForm(props) {
	const {
		clearOnSuccess = true,
		onSuccess,
		onError,
		onSubmit,
		onValidate,
		onChange,
		overrides,
		...rest
	} = props;
	const initialValues = {
		Name: "",
		AtpID: "",
		StartDate: "",
		EndDate: "",
		Location: ""
	};
	const [Name, setName] = React.useState(initialValues.Name);
	const [AtpID, setAtpID] = React.useState(initialValues.AtpID);
	const [StartDate, setStartDate] = React.useState(initialValues.StartDate);
	const [EndDate, setEndDate] = React.useState(initialValues.EndDate);
	const [Location, setLocation] = React.useState(initialValues.Location);
	const [errors, setErrors] = React.useState({});
	const resetStateValues = () => {
		setName(initialValues.Name);
		setAtpID(initialValues.AtpID);
		setStartDate(initialValues.StartDate);
		setEndDate(initialValues.EndDate);
		setLocation(initialValues.Location);
		setErrors({});
	};
	const validations = {
		Name: [{ type: "Required" }],
		AtpID: [],
		StartDate: [],
		EndDate: [],
		Location: []
	};
	const runValidationTasks = async (
		fieldName,
		currentValue,
		getDisplayValue
	) => {
		const value =
			currentValue && getDisplayValue
				? getDisplayValue(currentValue)
				: currentValue;
		let validationResponse = validateField(value, validations[fieldName]);
		const customValidator = fetchByPath(onValidate, fieldName);
		if (customValidator) {
			validationResponse = await customValidator(
				value,
				validationResponse
			);
		}
		setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
		return validationResponse;
	};
	return (
		<Grid
			as="form"
			rowGap="15px"
			columnGap="15px"
			padding="20px"
			onSubmit={async (event) => {
				event.preventDefault();
				let modelFields = {
					Name,
					AtpID,
					StartDate,
					EndDate,
					Location
				};
				const validationResponses = await Promise.all(
					Object.keys(validations).reduce((promises, fieldName) => {
						if (Array.isArray(modelFields[fieldName])) {
							promises.push(
								...modelFields[fieldName].map((item) =>
									runValidationTasks(fieldName, item)
								)
							);
							return promises;
						}
						promises.push(
							runValidationTasks(
								fieldName,
								modelFields[fieldName]
							)
						);
						return promises;
					}, [])
				);
				if (validationResponses.some((r) => r.hasError)) {
					return;
				}
				if (onSubmit) {
					modelFields = onSubmit(modelFields);
				}
				try {
					Object.entries(modelFields).forEach(([key, value]) => {
						if (typeof value === "string" && value === "") {
							modelFields[key] = null;
						}
					});
					await client.graphql({
						query: createTournaments.replaceAll("__typename", ""),
						variables: {
							input: {
								...modelFields
							}
						}
					});
					if (onSuccess) {
						onSuccess(modelFields);
					}
					if (clearOnSuccess) {
						resetStateValues();
					}
				} catch (err) {
					if (onError) {
						const messages = err.errors
							.map((e) => e.message)
							.join("\n");
						onError(modelFields, messages);
					}
				}
			}}
			{...getOverrideProps(overrides, "TournamentsCreateForm")}
			{...rest}
		>
			<TextField
				label="Name"
				isRequired={true}
				isReadOnly={false}
				value={Name}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							Name: value,
							AtpID,
							StartDate,
							EndDate,
							Location
						};
						const result = onChange(modelFields);
						value = result?.Name ?? value;
					}
					if (errors.Name?.hasError) {
						runValidationTasks("Name", value);
					}
					setName(value);
				}}
				onBlur={() => runValidationTasks("Name", Name)}
				errorMessage={errors.Name?.errorMessage}
				hasError={errors.Name?.hasError}
				{...getOverrideProps(overrides, "Name")}
			></TextField>
			<TextField
				label="Atp id"
				isRequired={false}
				isReadOnly={false}
				type="number"
				step="any"
				value={AtpID}
				onChange={(e) => {
					let value = isNaN(parseInt(e.target.value))
						? e.target.value
						: parseInt(e.target.value);
					if (onChange) {
						const modelFields = {
							Name,
							AtpID: value,
							StartDate,
							EndDate,
							Location
						};
						const result = onChange(modelFields);
						value = result?.AtpID ?? value;
					}
					if (errors.AtpID?.hasError) {
						runValidationTasks("AtpID", value);
					}
					setAtpID(value);
				}}
				onBlur={() => runValidationTasks("AtpID", AtpID)}
				errorMessage={errors.AtpID?.errorMessage}
				hasError={errors.AtpID?.hasError}
				{...getOverrideProps(overrides, "AtpID")}
			></TextField>
			<TextField
				label="Start date"
				isRequired={false}
				isReadOnly={false}
				type="date"
				value={StartDate}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							Name,
							AtpID,
							StartDate: value,
							EndDate,
							Location
						};
						const result = onChange(modelFields);
						value = result?.StartDate ?? value;
					}
					if (errors.StartDate?.hasError) {
						runValidationTasks("StartDate", value);
					}
					setStartDate(value);
				}}
				onBlur={() => runValidationTasks("StartDate", StartDate)}
				errorMessage={errors.StartDate?.errorMessage}
				hasError={errors.StartDate?.hasError}
				{...getOverrideProps(overrides, "StartDate")}
			></TextField>
			<TextField
				label="End date"
				isRequired={false}
				isReadOnly={false}
				type="date"
				value={EndDate}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							Name,
							AtpID,
							StartDate,
							EndDate: value,
							Location
						};
						const result = onChange(modelFields);
						value = result?.EndDate ?? value;
					}
					if (errors.EndDate?.hasError) {
						runValidationTasks("EndDate", value);
					}
					setEndDate(value);
				}}
				onBlur={() => runValidationTasks("EndDate", EndDate)}
				errorMessage={errors.EndDate?.errorMessage}
				hasError={errors.EndDate?.hasError}
				{...getOverrideProps(overrides, "EndDate")}
			></TextField>
			<TextField
				label="Location"
				isRequired={false}
				isReadOnly={false}
				value={Location}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							Name,
							AtpID,
							StartDate,
							EndDate,
							Location: value
						};
						const result = onChange(modelFields);
						value = result?.Location ?? value;
					}
					if (errors.Location?.hasError) {
						runValidationTasks("Location", value);
					}
					setLocation(value);
				}}
				onBlur={() => runValidationTasks("Location", Location)}
				errorMessage={errors.Location?.errorMessage}
				hasError={errors.Location?.hasError}
				{...getOverrideProps(overrides, "Location")}
			></TextField>
			<Flex
				justifyContent="space-between"
				{...getOverrideProps(overrides, "CTAFlex")}
			>
				<Button
					children="Clear"
					type="reset"
					onClick={(event) => {
						event.preventDefault();
						resetStateValues();
					}}
					{...getOverrideProps(overrides, "ClearButton")}
				></Button>
				<Flex
					gap="15px"
					{...getOverrideProps(overrides, "RightAlignCTASubFlex")}
				>
					<Button
						children="Submit"
						type="submit"
						variation="primary"
						isDisabled={Object.values(errors).some(
							(e) => e?.hasError
						)}
						{...getOverrideProps(overrides, "SubmitButton")}
					></Button>
				</Flex>
			</Flex>
		</Grid>
	);
}
