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
} from '@mui/material';
import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { PageLayout } from '../components/ page-layout';
import { PokemonCard, PokemonCardSkeleton } from '../components/pokemon-card';
import { TypeFilter } from '../components/type-filter';
import { useFavorites } from '../hooks/favorites';
import { Pokemon } from '../__generated__/graphql';

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

  useEffect(() => {
    if (data) {
      const { allPokemon } = data;

      setVisiblePokemonList([...allPokemon.slice(0, VISIBLE_ELEMENTS)]);
      setPokemons(allPokemon);
    }
  }, [data]);

  const handleSortSelection = (e: SelectChangeEvent): void => {
    const sortValue = e.target.value;

    let sortedPokemons = [];

    switch (sortValue) {
      case 'name-asc':
        sortedPokemons = [...pokemons].sort((a, b) =>
          a?.name && b?.name ? a?.name.localeCompare(b?.name) : 0
        );
        break;
      case 'name-desc':
        sortedPokemons = [...pokemons].sort((a, b) =>
          a?.name && b?.name ? b?.name.localeCompare(a?.name) : 0
        );
        break;
      default:
        sortedPokemons = [...(data?.allPokemon as Pokemon[])];
        break;
    }

    setVisiblePokemonList(sortedPokemons.slice(0, 30));
    setPokemons(sortedPokemons);
    setSortBy(sortValue);
  };

  let filterTimeout: NodeJS.Timeout;

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    clearTimeout(filterTimeout);

    const searchValue = e.target.value;
    setSearchValue(searchValue);

    filterTimeout = setTimeout(() => {
      const filteredPokemons = [...pokemons].filter(
        (p) =>
          p.name?.toLowerCase().includes(searchValue.toLowerCase()) ??
          p.types
            ?.map((t) => t?.name)
            .some((n) => n?.toLowerCase().includes(searchValue.toLowerCase()))
      );

      setVisiblePokemonList(filteredPokemons.slice(0, VISIBLE_ELEMENTS));
    }, 500);
  };

  const handleFavoriteButtonClick = (pokemon: Pokemon): void =>
    isFavorite(pokemon) ? removeFavorite(pokemon) : addFavorite(pokemon);

  const handleFilterByType = (filters: string[]): void => {
    if (!data) return;

    if (filters.length === 0) {
      setVisiblePokemonList([...pokemons].slice(0, VISIBLE_ELEMENTS));
    } else {
      const filteredPokemons = [...pokemons].filter((p) =>
        p.types?.map((t) => t?.name).some((n) => filters.includes(n ?? ''))
      );

      setVisiblePokemonList(filteredPokemons.slice(0, VISIBLE_ELEMENTS));
    }
  };

  const renderLoadingSkeletons = (): ReactElement[] =>
    Array.from(new Array(12)).map((n) => (
      <Grid key={n} item xs={12} sm={6} md={4} lg={3}>
        <PokemonCardSkeleton />
      </Grid>
    ));

  const renderPokemonList = (): ReactElement[] =>
    visiblePokemonList.map((pokemon, i) => (
      <Grid key={pokemon?.id} item xs={12} sm={6} md={4} lg={3}>
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
