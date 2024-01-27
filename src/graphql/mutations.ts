/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
	__generatedMutationInput: InputType;
	__generatedMutationOutput: OutputType;
};

export const createTournaments = /* GraphQL */ `mutation CreateTournaments(
  $input: CreateTournamentsInput!
  $condition: ModelTournamentsConditionInput
) {
  createTournaments(input: $input, condition: $condition) {
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
` as GeneratedMutation<
	APITypes.CreateTournamentsMutationVariables,
	APITypes.CreateTournamentsMutation
>;
export const updateTournaments = /* GraphQL */ `mutation UpdateTournaments(
  $input: UpdateTournamentsInput!
  $condition: ModelTournamentsConditionInput
) {
  updateTournaments(input: $input, condition: $condition) {
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
` as GeneratedMutation<
	APITypes.UpdateTournamentsMutationVariables,
	APITypes.UpdateTournamentsMutation
>;
export const deleteTournaments = /* GraphQL */ `mutation DeleteTournaments(
  $input: DeleteTournamentsInput!
  $condition: ModelTournamentsConditionInput
) {
  deleteTournaments(input: $input, condition: $condition) {
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
` as GeneratedMutation<
	APITypes.DeleteTournamentsMutationVariables,
	APITypes.DeleteTournamentsMutation
>;
