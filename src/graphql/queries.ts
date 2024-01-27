/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
	__generatedQueryInput: InputType;
	__generatedQueryOutput: OutputType;
};

export const getTournaments = /* GraphQL */ `query GetTournaments($id: ID!) {
  getTournaments(id: $id) {
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
` as GeneratedQuery<
	APITypes.GetTournamentsQueryVariables,
	APITypes.GetTournamentsQuery
>;
export const listTournaments = /* GraphQL */ `query ListTournaments(
  $filter: ModelTournamentsFilterInput
  $limit: Int
  $nextToken: String
) {
  listTournaments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
	APITypes.ListTournamentsQueryVariables,
	APITypes.ListTournamentsQuery
>;
