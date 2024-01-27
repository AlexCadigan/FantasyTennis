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
import { getTournaments } from "../graphql/queries";
import { updateTournaments } from "../graphql/mutations";
const client = generateClient();
export default function TournamentsUpdateForm(props) {
	const {
		id: idProp,
		tournaments: tournamentsModelProp,
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
		const cleanValues = tournamentsRecord
			? { ...initialValues, ...tournamentsRecord }
			: initialValues;
		setName(cleanValues.Name);
		setAtpID(cleanValues.AtpID);
		setStartDate(cleanValues.StartDate);
		setEndDate(cleanValues.EndDate);
		setLocation(cleanValues.Location);
		setErrors({});
	};
	const [tournamentsRecord, setTournamentsRecord] =
		React.useState(tournamentsModelProp);
	React.useEffect(() => {
		const queryData = async () => {
			const record = idProp
				? (
						await client.graphql({
							query: getTournaments.replaceAll("__typename", ""),
							variables: { id: idProp }
						})
				  )?.data?.getTournaments
				: tournamentsModelProp;
			setTournamentsRecord(record);
		};
		queryData();
	}, [idProp, tournamentsModelProp]);
	React.useEffect(resetStateValues, [tournamentsRecord]);
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
					AtpID: AtpID ?? null,
					StartDate: StartDate ?? null,
					EndDate: EndDate ?? null,
					Location: Location ?? null
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
						query: updateTournaments.replaceAll("__typename", ""),
						variables: {
							input: {
								id: tournamentsRecord.id,
								...modelFields
							}
						}
					});
					if (onSuccess) {
						onSuccess(modelFields);
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
			{...getOverrideProps(overrides, "TournamentsUpdateForm")}
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
					children="Reset"
					type="reset"
					onClick={(event) => {
						event.preventDefault();
						resetStateValues();
					}}
					isDisabled={!(idProp || tournamentsModelProp)}
					{...getOverrideProps(overrides, "ResetButton")}
				></Button>
				<Flex
					gap="15px"
					{...getOverrideProps(overrides, "RightAlignCTASubFlex")}
				>
					<Button
						children="Submit"
						type="submit"
						variation="primary"
						isDisabled={
							!(idProp || tournamentsModelProp) ||
							Object.values(errors).some((e) => e?.hasError)
						}
						{...getOverrideProps(overrides, "SubmitButton")}
					></Button>
				</Flex>
			</Flex>
		</Grid>
	);
}
