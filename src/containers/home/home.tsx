import { gql, useQuery } from '@apollo/client';
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import debounce from 'lodash.debounce';
import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Waypoint } from 'react-waypoint';
import { PageLayout } from '../../components/ page-layout';
import {
  PokemonCard,
  PokemonCardSkeleton,
} from '../../components/pokemon-card';
import { useFavorites } from '../../hooks/favorites';
import { Pokemon } from '../../__generated__/graphql';
import { TypeFilter } from './type-filter';
import { filtersBuilder } from './utils';

const GET_ALL_POKEMONS = gql(/* GraphQL */ `
  query AllPokemon($filter: Boolean, $limit: Int) {
    allPokemon(filter: $filter, limit: $limit) {
      name
      id
      nat_dex_num
      sprites {
        front_default
      }
      types {
        name
      }
    }
  }
`);

const VISIBLE_ELEMENTS = 30;

export const Home = (): ReactElement => {
  const { loading, data } = useQuery(GET_ALL_POKEMONS);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [visiblePokemonList, setVisiblePokemonList] = useState<Pokemon[]>([]);
  const [sortBy, setSortBy] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>('');
  const [activeTypeFilters, setActiveTypeFilters] = useState<TypeFilters[]>([]);

  const applyFilters = filtersBuilder(data?.allPokemon ?? []);

  useEffect(() => {
    if (data) {
      const { allPokemon } = data;

      setVisiblePokemonList([...allPokemon.slice(0, VISIBLE_ELEMENTS)]);
      setPokemons(allPokemon);
    }
  }, [data]);

  useEffect(() => {
    const filteredPokemonList = applyFilters({
      searchText: debouncedSearchValue,
      sortCriteria: sortBy,
      typeFilter: activeTypeFilters,
    });

    setPokemons([...filteredPokemonList]);
    setVisiblePokemonList(filteredPokemonList.slice(0, VISIBLE_ELEMENTS));
  }, [debouncedSearchValue, sortBy, activeTypeFilters]);

  const handleSortSelection = (e: SelectChangeEvent): void => {
    setSortBy(e.target.value);
  };

  const debouncedSearchChange = useCallback(
    debounce(
      (_searchValue: string) => setDebouncedSearchValue(_searchValue),
      500
    ),
    []
  );

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const _searchValue = e.target.value;
    setSearchValue(_searchValue);
    debouncedSearchChange(_searchValue);
  };

  const handleFavoriteButtonClick = (pokemon: Pokemon): void =>
    isFavorite(pokemon) ? removeFavorite(pokemon) : addFavorite(pokemon);

  const handleFilterByType = (filters: TypeFilters[]): void => {
    setActiveTypeFilters(filters);
  };

  const renderLoadingSkeletons = (): ReactElement[] =>
    Array.from(new Array(12)).map((_, i) => (
      <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
        <PokemonCardSkeleton />
      </Grid>
    ));

  const renderPokemonList = (): ReactElement | ReactElement[] => {
    if (searchValue && visiblePokemonList.length === 0) {
      return (
        <Grid item xs={12}>
          <Typography variant="h4">No Pokemon Matched Your Search</Typography>
        </Grid>
      );
    }

    return visiblePokemonList.map((pokemon, i) => (
      <Grid
        key={pokemon?.name}
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        data-testid={`pokemon-card-${i}`}
      >
        <PokemonCard
          pokemon={pokemon}
          isFavorite={isFavorite(pokemon)}
          onFavoriteButtonClick={handleFavoriteButtonClick}
        />
        {i === visiblePokemonList.length - 4 && (
          <Waypoint
            onEnter={() =>
              setVisiblePokemonList([
                ...visiblePokemonList,
                ...pokemons.slice(
                  visiblePokemonList.length,
                  visiblePokemonList.length + VISIBLE_ELEMENTS
                ),
              ])
            }
          />
        )}
      </Grid>
    ));
  };

  return (
    <PageLayout>
      <Grid container mb={2} spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Search"
            placeholder="Type to search by name or type..."
            variant="outlined"
            onChange={onSearchChange}
            value={searchValue}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TypeFilter onAddFilter={handleFilterByType} />
        </Grid>
      </Grid>

      <Box mb={2} justifyContent="flex-end" display="flex">
        <Box width={[1, 1 / 2, 1 / 3]}>
          <FormControl fullWidth>
            <InputLabel id="sorty-by-filter-label">Sort by</InputLabel>
            <Select
              labelId="sorty-by-filter-label"
              value={sortBy}
              label="Sort by"
              onChange={handleSortSelection}
            >
              <MenuItem value="nat-dex-num-asc">
                National Dex Number (Default)
              </MenuItem>
              <MenuItem value="name-asc">A-Z</MenuItem>
              <MenuItem value="name-desc">Z-A</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Grid container spacing={4}>
        {loading ? renderLoadingSkeletons() : renderPokemonList()}
        {!searchValue && !loading && (
          <Grid item xs={12} textAlign="center">
            <CircularProgress />
          </Grid>
        )}
      </Grid>
    </PageLayout>
  );
};
