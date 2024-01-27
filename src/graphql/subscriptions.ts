/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
	__generatedSubscriptionInput: InputType;
	__generatedSubscriptionOutput: OutputType;
};

export const onCreateTournaments =
	/* GraphQL */ `subscription OnCreateTournaments(
  $filter: ModelSubscriptionTournamentsFilterInput
) {
  onCreateTournaments(filter: $filter) {
    id
    Name
    AtpID
    StartDate
    EndDate
    Location
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
		APITypes.OnCreateTournamentsSubscriptionVariables,
		APITypes.OnCreateTournamentsSubscription
	>;
export const onUpdateTournaments =
	/* GraphQL */ `subscription OnUpdateTournaments(
  $filter: ModelSubscriptionTournamentsFilterInput
) {
  onUpdateTournaments(filter: $filter) {
    id
    Name
    AtpID
    StartDate
    EndDate
    Location
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
		APITypes.OnUpdateTournamentsSubscriptionVariables,
		APITypes.OnUpdateTournamentsSubscription
	>;
export const onDeleteTournaments =
	/* GraphQL */ `subscription OnDeleteTournaments(
  $filter: ModelSubscriptionTournamentsFilterInput
) {
  onDeleteTournaments(filter: $filter) {
    id
    Name
    AtpID
    StartDate
    EndDate
    Location
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
		APITypes.OnDeleteTournamentsSubscriptionVariables,
		APITypes.OnDeleteTournamentsSubscription
	>;
