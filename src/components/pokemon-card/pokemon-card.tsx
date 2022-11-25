import { Star, StarBorder } from '@mui/icons-material';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import { ReactElement } from 'react';
import { POKEMON_TYPE_COLOR_MAP } from '../../common/constants';
import { Pokemon } from '../../__generated__/graphql';
import { PokemonCardContainer } from './styled/pokemon-card-container';
import { PokemonCardContent } from './styled/pokemon-card-content';
import { PokemonCardMedia } from './styled/pokemon-card-media';

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  isLoading?: boolean;
  onFavoriteButtonClick: (pokemon: Pokemon) => void;
}

export const PokemonCard = ({
  pokemon,
  isFavorite,
  onFavoriteButtonClick,
}: PokemonCardProps): ReactElement => {
  return (
    <PokemonCardContainer>
      <Box position="absolute" sx={{ top: 4, right: 4 }}>
        <IconButton onClick={() => onFavoriteButtonClick(pokemon)}>
          {isFavorite ? (
            <Tooltip title="Remove from favorites">
              <Star />
            </Tooltip>
          ) : (
            <Tooltip title="Add to favorites">
              <StarBorder />
            </Tooltip>
          )}
        </IconButton>
      </Box>
      <PokemonCardMedia>
        <Box
          component="img"
          src={pokemon?.sprites?.front_default ?? ''}
          alt="random"
          sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </PokemonCardMedia>
      <PokemonCardContent
        natDexNum={`#${String(pokemon?.nat_dex_num ?? '---').padStart(3, '0')}`}
        pokemonName={pokemon.name}
        pokemonTypes={pokemon.types?.map((t) => (
          <Chip
            key={t?.name}
            label={t?.name}
            size="small"
            sx={{
              background: POKEMON_TYPE_COLOR_MAP[t?.name ?? ''],
              color: 'white',
            }}
          />
        ))}
      />
    </PokemonCardContainer>
  );
};
