import { Skeleton } from '@mui/material';
import { ReactElement } from 'react';
import { PokemonCardContainer } from './styled/pokemon-card-container';
import { PokemonCardContent } from './styled/pokemon-card-content';
import { PokemonCardMedia } from './styled/pokemon-card-media';

export const PokemonCardSkeleton = (): ReactElement => (
  <PokemonCardContainer>
    <PokemonCardMedia>
      <Skeleton height="100%" animation="wave" variant="rectangular" />
    </PokemonCardMedia>
    <PokemonCardContent
      natDexNum={<Skeleton />}
      pokemonName={<Skeleton />}
      pokemonTypes={<Skeleton width="40%" />}
    />
  </PokemonCardContainer>
);
