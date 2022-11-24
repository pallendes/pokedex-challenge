/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query AllPokemon($filter: Boolean, $limit: Int) {\n    allPokemon(filter: $filter, limit: $limit) {\n      name\n      id\n      nat_dex_num\n      sprites {\n        front_default\n      }\n      types {\n        name\n      }\n    }\n  }\n": types.AllPokemonDocument,
};

export function graphql(source: "\n  query AllPokemon($filter: Boolean, $limit: Int) {\n    allPokemon(filter: $filter, limit: $limit) {\n      name\n      id\n      nat_dex_num\n      sprites {\n        front_default\n      }\n      types {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllPokemon($filter: Boolean, $limit: Int) {\n    allPokemon(filter: $filter, limit: $limit) {\n      name\n      id\n      nat_dex_num\n      sprites {\n        front_default\n      }\n      types {\n        name\n      }\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;