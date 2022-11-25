import { Star } from '@mui/icons-material';
import { Box, Grid, Grow, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { PageLayout } from '../../components/ page-layout';
import { PokemonCard } from '../../components/pokemon-card';
import { useFavorites } from '../../hooks/favorites';

export const Favorites = (): ReactElement => {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <PageLayout>
        <Box display="flex" mb={4} alignItems="baseline">
          <Typography component="h1" variant="h3" color="text.primary">
            No favorite pokemons added yet
          </Typography>
        </Box>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Box display="flex" mb={4} alignItems="baseline">
        <Typography component="h1" variant="h3" color="text.primary">
          Favorite pokemons
        </Typography>
        <Star fontSize="large" sx={{ ml: 1 }} />
      </Box>
      <Grid container spacing={4} component={TransitionGroup}>
        {favorites.map((pokemon, i) => (
          <Grow key={pokemon?.id}>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              data-testid={`favorite-card-${pokemon?.id ?? i}`}
            >
              <PokemonCard
                pokemon={pokemon}
                isFavorite
                onFavoriteButtonClick={() => removeFavorite(pokemon)}
              />
            </Grid>
          </Grow>
        ))}
      </Grid>
    </PageLayout>
  );
};
