/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTournamentsInput = {
	id?: string | null;
	Name: string;
	AtpID?: number | null;
	StartDate?: string | null;
	EndDate?: string | null;
	Location?: string | null;
};

export type ModelTournamentsConditionInput = {
	Name?: ModelStringInput | null;
	AtpID?: ModelIntInput | null;
	StartDate?: ModelStringInput | null;
	EndDate?: ModelStringInput | null;
	Location?: ModelStringInput | null;
	and?: Array<ModelTournamentsConditionInput | null> | null;
	or?: Array<ModelTournamentsConditionInput | null> | null;
	not?: ModelTournamentsConditionInput | null;
};

export type ModelStringInput = {
	ne?: string | null;
	eq?: string | null;
	le?: string | null;
	lt?: string | null;
	ge?: string | null;
	gt?: string | null;
	contains?: string | null;
	notContains?: string | null;
	between?: Array<string | null> | null;
	beginsWith?: string | null;
	attributeExists?: boolean | null;
	attributeType?: ModelAttributeTypes | null;
	size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
	binary = "binary",
	binarySet = "binarySet",
	bool = "bool",
	list = "list",
	map = "map",
	number = "number",
	numberSet = "numberSet",
	string = "string",
	stringSet = "stringSet",
	_null = "_null"
}

export type ModelSizeInput = {
	ne?: number | null;
	eq?: number | null;
	le?: number | null;
	lt?: number | null;
	ge?: number | null;
	gt?: number | null;
	between?: Array<number | null> | null;
};

export type ModelIntInput = {
	ne?: number | null;
	eq?: number | null;
	le?: number | null;
	lt?: number | null;
	ge?: number | null;
	gt?: number | null;
	between?: Array<number | null> | null;
	attributeExists?: boolean | null;
	attributeType?: ModelAttributeTypes | null;
};

export type Tournaments = {
	__typename: "Tournaments";
	id: string;
	Name: string;
	AtpID?: number | null;
	StartDate?: string | null;
	EndDate?: string | null;
	Location?: string | null;
	createdAt: string;
	updatedAt: string;
};

export type UpdateTournamentsInput = {
	id: string;
	Name?: string | null;
	AtpID?: number | null;
	StartDate?: string | null;
	EndDate?: string | null;
	Location?: string | null;
};

export type DeleteTournamentsInput = {
	id: string;
};

export type ModelTournamentsFilterInput = {
	id?: ModelIDInput | null;
	Name?: ModelStringInput | null;
	AtpID?: ModelIntInput | null;
	StartDate?: ModelStringInput | null;
	EndDate?: ModelStringInput | null;
	Location?: ModelStringInput | null;
	and?: Array<ModelTournamentsFilterInput | null> | null;
	or?: Array<ModelTournamentsFilterInput | null> | null;
	not?: ModelTournamentsFilterInput | null;
};

export type ModelIDInput = {
	ne?: string | null;
	eq?: string | null;
	le?: string | null;
	lt?: string | null;
	ge?: string | null;
	gt?: string | null;
	contains?: string | null;
	notContains?: string | null;
	between?: Array<string | null> | null;
	beginsWith?: string | null;
	attributeExists?: boolean | null;
	attributeType?: ModelAttributeTypes | null;
	size?: ModelSizeInput | null;
};

export type ModelTournamentsConnection = {
	__typename: "ModelTournamentsConnection";
	items: Array<Tournaments | null>;
	nextToken?: string | null;
};

export type ModelSubscriptionTournamentsFilterInput = {
	id?: ModelSubscriptionIDInput | null;
	Name?: ModelSubscriptionStringInput | null;
	AtpID?: ModelSubscriptionIntInput | null;
	StartDate?: ModelSubscriptionStringInput | null;
	EndDate?: ModelSubscriptionStringInput | null;
	Location?: ModelSubscriptionStringInput | null;
	and?: Array<ModelSubscriptionTournamentsFilterInput | null> | null;
	or?: Array<ModelSubscriptionTournamentsFilterInput | null> | null;
};

export type ModelSubscriptionIDInput = {
	ne?: string | null;
	eq?: string | null;
	le?: string | null;
	lt?: string | null;
	ge?: string | null;
	gt?: string | null;
	contains?: string | null;
	notContains?: string | null;
	between?: Array<string | null> | null;
	beginsWith?: string | null;
	in?: Array<string | null> | null;
	notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
	ne?: string | null;
	eq?: string | null;
	le?: string | null;
	lt?: string | null;
	ge?: string | null;
	gt?: string | null;
	contains?: string | null;
	notContains?: string | null;
	between?: Array<string | null> | null;
	beginsWith?: string | null;
	in?: Array<string | null> | null;
	notIn?: Array<string | null> | null;
};

export type ModelSubscriptionIntInput = {
	ne?: number | null;
	eq?: number | null;
	le?: number | null;
	lt?: number | null;
	ge?: number | null;
	gt?: number | null;
	between?: Array<number | null> | null;
	in?: Array<number | null> | null;
	notIn?: Array<number | null> | null;
};

export type CreateTournamentsMutationVariables = {
	input: CreateTournamentsInput;
	condition?: ModelTournamentsConditionInput | null;
};

export type CreateTournamentsMutation = {
	createTournaments?: {
		__typename: "Tournaments";
		id: string;
		Name: string;
		AtpID?: number | null;
		StartDate?: string | null;
		EndDate?: string | null;
		Location?: string | null;
		createdAt: string;
		updatedAt: string;
	} | null;
};

export type UpdateTournamentsMutationVariables = {
	input: UpdateTournamentsInput;
	condition?: ModelTournamentsConditionInput | null;
};

export type UpdateTournamentsMutation = {
	updateTournaments?: {
		__typename: "Tournaments";
		id: string;
		Name: string;
		AtpID?: number | null;
		StartDate?: string | null;
		EndDate?: string | null;
		Location?: string | null;
		createdAt: string;
		updatedAt: string;
	} | null;
};

export type DeleteTournamentsMutationVariables = {
	input: DeleteTournamentsInput;
	condition?: ModelTournamentsConditionInput | null;
};

export type DeleteTournamentsMutation = {
	deleteTournaments?: {
		__typename: "Tournaments";
		id: string;
		Name: string;
		AtpID?: number | null;
		StartDate?: string | null;
		EndDate?: string | null;
		Location?: string | null;
		createdAt: string;
		updatedAt: string;
	} | null;
};

export type GetTournamentsQueryVariables = {
	id: string;
};

export type GetTournamentsQuery = {
	getTournaments?: {
		__typename: "Tournaments";
		id: string;
		Name: string;
		AtpID?: number | null;
		StartDate?: string | null;
		EndDate?: string | null;
		Location?: string | null;
		createdAt: string;
		updatedAt: string;
	} | null;
};

export type ListTournamentsQueryVariables = {
	filter?: ModelTournamentsFilterInput | null;
	limit?: number | null;
	nextToken?: string | null;
};

export type ListTournamentsQuery = {
	listTournaments?: {
		__typename: "ModelTournamentsConnection";
		items: Array<{
			__typename: "Tournaments";
			id: string;
			Name: string;
			AtpID?: number | null;
			StartDate?: string | null;
			EndDate?: string | null;
			Location?: string | null;
			createdAt: string;
			updatedAt: string;
		} | null>;
		nextToken?: string | null;
	} | null;
};

export type OnCreateTournamentsSubscriptionVariables = {
	filter?: ModelSubscriptionTournamentsFilterInput | null;
};

export type OnCreateTournamentsSubscription = {
	onCreateTournaments?: {
		__typename: "Tournaments";
		id: string;
		Name: string;
		AtpID?: number | null;
		StartDate?: string | null;
		EndDate?: string | null;
		Location?: string | null;
		createdAt: string;
		updatedAt: string;
	} | null;
};

export type OnUpdateTournamentsSubscriptionVariables = {
	filter?: ModelSubscriptionTournamentsFilterInput | null;
};

export type OnUpdateTournamentsSubscription = {
	onUpdateTournaments?: {
		__typename: "Tournaments";
		id: string;
		Name: string;
		AtpID?: number | null;
		StartDate?: string | null;
		EndDate?: string | null;
		Location?: string | null;
		createdAt: string;
		updatedAt: string;
	} | null;
};

export type OnDeleteTournamentsSubscriptionVariables = {
	filter?: ModelSubscriptionTournamentsFilterInput | null;
};

export type OnDeleteTournamentsSubscription = {
	onDeleteTournaments?: {
		__typename: "Tournaments";
		id: string;
		Name: string;
		AtpID?: number | null;
		StartDate?: string | null;
		EndDate?: string | null;
		Location?: string | null;
		createdAt: string;
		updatedAt: string;
	} | null;
};
