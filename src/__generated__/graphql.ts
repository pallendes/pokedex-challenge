/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Ability = {
  __typename?: 'Ability';
  description?: Maybe<Scalars['String']>;
  effect?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  is_hidden?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  /** array of Pokemon that can have the queried Ability */
  pokemon?: Maybe<Array<Maybe<Pokemon>>>;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type DexEntry = {
  __typename?: 'DexEntry';
  description?: Maybe<Scalars['String']>;
  /** game/version the queried DexEntry is from */
  game?: Maybe<Game>;
};

export type Dominant_Color = {
  __typename?: 'Dominant_Color';
  b?: Maybe<Scalars['Int']>;
  dark?: Maybe<Scalars['String']>;
  g?: Maybe<Scalars['Int']>;
  light?: Maybe<Scalars['String']>;
  original?: Maybe<Scalars['String']>;
  r?: Maybe<Scalars['Int']>;
};

export type EggGroup = {
  __typename?: 'EggGroup';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  /** array of Pokemon in the queried egg group */
  pokemon?: Maybe<Array<Maybe<Pokemon>>>;
};

/** EvolutionCriteria can be one or more of several possible different types */
export type EvolutionCriteria = Gender | Item | Location | Move | OtherEvolutionCriteria | Type;

export type Game = {
  __typename?: 'Game';
  generation?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  /** array of Regions that are found in the queried Game */
  regions?: Maybe<Array<Maybe<Region>>>;
};

export type Gender = {
  __typename?: 'Gender';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type Item = {
  __typename?: 'Item';
  bag_pocket?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  /** Use in an evolution_criteria query; returns the name of the evolution criteria that must have been met for the Pokémon to have evolved */
  effect?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  sprite?: Maybe<Scalars['String']>;
};

export type Location = {
  __typename?: 'Location';
  /** array of games/versions in which pokemon are found at the queried Location */
  games?: Maybe<Array<Maybe<Game>>>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  /** array of Pokemon that can be found at the queried Location */
  pokemon?: Maybe<Array<Maybe<Pokemon>>>;
  region?: Maybe<Region>;
};

export type Move = {
  __typename?: 'Move';
  accuracy?: Maybe<Scalars['Int']>;
  ailment?: Maybe<Scalars['String']>;
  /** physical or special */
  damage_class?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  /** possible status condition effect */
  effect?: Maybe<Scalars['String']>;
  effect_chance?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  /** level, egg, move tutor, tm/hm */
  learn_methods?: Maybe<Array<Maybe<MoveLearnMethod>>>;
  name?: Maybe<Scalars['String']>;
  original_games?: Maybe<Array<Maybe<Game>>>;
  power?: Maybe<Scalars['Int']>;
  pp?: Maybe<Scalars['Int']>;
  priority?: Maybe<Scalars['Int']>;
  type?: Maybe<Type>;
};

export type MoveDescription = {
  __typename?: 'MoveDescription';
  description?: Maybe<Scalars['String']>;
  games?: Maybe<Array<Maybe<Game>>>;
};

export type MoveLearnMethod = {
  __typename?: 'MoveLearnMethod';
  games?: Maybe<Array<Maybe<Game>>>;
  level_learned_at?: Maybe<Scalars['Int']>;
  /** how the Pokemon learns the queried Move */
  method?: Maybe<Scalars['String']>;
};

export type NameAndId = {
  __typename?: 'NameAndId';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type OtherEvolutionCriteria = {
  __typename?: 'OtherEvolutionCriteria';
  /** example response: time_of_day */
  evolution_criteria_name?: Maybe<Scalars['String']>;
  /** example response: night */
  value?: Maybe<Scalars['String']>;
};

/** query for an individual Pokemon's info */
export type Pokemon = {
  __typename?: 'Pokemon';
  /** array of Abilities that the queried Pokemon can have */
  abilities?: Maybe<Array<Maybe<Ability>>>;
  base_experience?: Maybe<Scalars['Int']>;
  base_happiness?: Maybe<Scalars['Int']>;
  /** base stats of the queried Pokemon */
  base_stats?: Maybe<Stats>;
  /** capture rate of the queried Pokemon when using a normal Pokeball at full health */
  capture_rate?: Maybe<Scalars['Int']>;
  /** basic color of the queried Pokemon */
  color?: Maybe<Scalars['String']>;
  /** dominant color of the queried Pokemon's image */
  dominant_color?: Maybe<Dominant_Color>;
  /** array of the different EggGroups that the queried Pokemon belongs to */
  egg_groups?: Maybe<Array<Maybe<EggGroup>>>;
  /** the Pokemon at the 'beginning' of the queried Pokemon's evolution chain (i.e. Charmander, even if you requested Charizard) */
  evolution_chain_start: Pokemon;
  /** array of all criteria that must be met for the queried Pokemon to evolve */
  evolution_criteria?: Maybe<Array<Maybe<EvolutionCriteria>>>;
  /** what triggers the queried Pokemon to evolve if all evolution criteria have been met */
  evolution_trigger?: Maybe<Scalars['String']>;
  /** Pokemon that the queried Pokemon evolves from */
  evolves_from?: Maybe<Pokemon>;
  /** array of Pokemon that the queried Pokemon can evolve into */
  evolves_to?: Maybe<Array<Maybe<Pokemon>>>;
  /** array of Games that the queried Pokemon is found in */
  games?: Maybe<Array<Maybe<Game>>>;
  /** percent chance of the queried Pokémon being female (-1 for genderless) */
  gender_rate?: Maybe<Scalars['Float']>;
  /** which generation the queried Pokemon debuted in */
  generation?: Maybe<Scalars['String']>;
  genus?: Maybe<Scalars['String']>;
  growth_rate?: Maybe<Scalars['String']>;
  hatch_counter?: Maybe<Scalars['Int']>;
  /** height in meters */
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  is_baby?: Maybe<Scalars['Boolean']>;
  /** true if it's the default form, false if it's a variant (i.e. alola, galar, mega, etc) */
  is_default?: Maybe<Scalars['Boolean']>;
  /** array of Locations that the queried Pokemon can be found in */
  locations?: Maybe<Array<Maybe<Location>>>;
  /** array of Move objects */
  moves?: Maybe<Array<Maybe<Move>>>;
  name?: Maybe<Scalars['String']>;
  nat_dex_num?: Maybe<Scalars['Int']>;
  /** array of DexEntry objects */
  pokedex_entries?: Maybe<Array<Maybe<DexEntry>>>;
  shape?: Maybe<Scalars['String']>;
  /** array of Sprite objects */
  sprites?: Maybe<Sprites>;
  /** array of all the different Types of the queried Pokemon */
  types?: Maybe<Array<Maybe<Type>>>;
  /** array of different variant forms of the queried Pokemon */
  variants?: Maybe<Array<Maybe<Pokemon>>>;
  /** weight in kilograms */
  weight?: Maybe<Scalars['Int']>;
};


/** query for an individual Pokemon's info */
export type PokemonAbilitiesArgs = {
  game?: InputMaybe<Scalars['String']>;
};


/** query for an individual Pokemon's info */
export type PokemonEvolution_CriteriaArgs = {
  game?: InputMaybe<Scalars['String']>;
};


/** query for an individual Pokemon's info */
export type PokemonMovesArgs = {
  game: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  ability?: Maybe<Ability>;
  allAbilities?: Maybe<Array<Maybe<Ability>>>;
  allEggGroups?: Maybe<Array<Maybe<EggGroup>>>;
  allGames?: Maybe<Array<Maybe<Game>>>;
  allItems?: Maybe<Array<Maybe<Item>>>;
  allLocations?: Maybe<Array<Maybe<Location>>>;
  allMoves?: Maybe<Array<Maybe<Move>>>;
  /** get range of Pokemon starting from start variable */
  allPokemon?: Maybe<Array<Maybe<Pokemon>>>;
  allRegions?: Maybe<Array<Maybe<Region>>>;
  allTypes?: Maybe<Array<Maybe<Type>>>;
  eggGroup?: Maybe<EggGroup>;
  game?: Maybe<Game>;
  item?: Maybe<Item>;
  location?: Maybe<Location>;
  move?: Maybe<Move>;
  pokemon?: Maybe<Pokemon>;
  region?: Maybe<Region>;
  type?: Maybe<Type>;
};


export type QueryAbilityArgs = {
  game?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type QueryAllPokemonArgs = {
  filter?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryAllTypesArgs = {
  end?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};


export type QueryEggGroupArgs = {
  id: Scalars['Int'];
};


export type QueryGameArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryItemArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryLocationArgs = {
  id: Scalars['Int'];
};


export type QueryMoveArgs = {
  id: Scalars['Int'];
};


export type QueryPokemonArgs = {
  id: Scalars['Int'];
};


export type QueryRegionArgs = {
  id: Scalars['Int'];
};


export type QueryTypeArgs = {
  id: Scalars['Int'];
};

export type Region = {
  __typename?: 'Region';
  /** array of Games the queried Region is found in */
  games?: Maybe<Array<Maybe<Game>>>;
  id?: Maybe<Scalars['Int']>;
  /** array of Locations that are in the queried Region */
  locations?: Maybe<Array<Maybe<Location>>>;
  name?: Maybe<Scalars['String']>;
};

export type Sprites = {
  __typename?: 'Sprites';
  back_default?: Maybe<Scalars['String']>;
  back_female?: Maybe<Scalars['String']>;
  back_shiny?: Maybe<Scalars['String']>;
  back_shiny_female?: Maybe<Scalars['String']>;
  front_default?: Maybe<Scalars['String']>;
  front_female?: Maybe<Scalars['String']>;
  front_shiny?: Maybe<Scalars['String']>;
  front_shiny_female?: Maybe<Scalars['String']>;
};

export type Stats = {
  __typename?: 'Stats';
  attack?: Maybe<Scalars['Int']>;
  defense?: Maybe<Scalars['Int']>;
  hp?: Maybe<Scalars['Int']>;
  special_attack?: Maybe<Scalars['Int']>;
  special_defense?: Maybe<Scalars['Int']>;
  speed?: Maybe<Scalars['Int']>;
};

/** Pokemon type (i.e. Grass, Electric, Water, etc) */
export type Type = {
  __typename?: 'Type';
  /** array of super effective Types that the queried type receives double damage from */
  double_damage_from?: Maybe<Array<Maybe<Type>>>;
  /** array of Types the queried type inflicts double damage upon */
  double_damage_to?: Maybe<Array<Maybe<Type>>>;
  /** array of not very effective Types the queried type receives half damage from */
  half_damage_from?: Maybe<Array<Maybe<Type>>>;
  /** array of Types the queried type inflicts double damage upon */
  half_damage_to?: Maybe<Array<Maybe<Type>>>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  /** array of ineffective Types the queried type receives no damage from */
  no_damage_from?: Maybe<Array<Maybe<Type>>>;
  /** array of Types the queried type inflicts no damage upon */
  no_damage_to?: Maybe<Array<Maybe<Type>>>;
  /** array of Pokemon that have the queried Type */
  pokemon?: Maybe<Array<Maybe<Pokemon>>>;
};

export type AllPokemonQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type AllPokemonQuery = { __typename?: 'Query', allPokemon?: Array<{ __typename?: 'Pokemon', name?: string | null, id?: number | null, nat_dex_num?: number | null, sprites?: { __typename?: 'Sprites', front_default?: string | null } | null, types?: Array<{ __typename?: 'Type', name?: string | null } | null> | null } | null> | null };


export const AllPokemonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllPokemon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allPokemon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nat_dex_num"}},{"kind":"Field","name":{"kind":"Name","value":"sprites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"front_default"}}]}},{"kind":"Field","name":{"kind":"Name","value":"types"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AllPokemonQuery, AllPokemonQueryVariables>;