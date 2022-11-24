import { CardContent, Stack, Typography } from '@mui/material';
import { ReactElement, ReactNode } from 'react';

interface PokemonCardContentProps {
  natDexNum: ReactNode;
  pokemonName: ReactNode;
  pokemonTypes: ReactNode;
}

export const PokemonCardContent = ({
  natDexNum,
  pokemonName,
  pokemonTypes,
}: PokemonCardContentProps): ReactElement => (
  <CardContent sx={{ flexGrow: 1 }}>
    <Typography
      gutterBottom
      sx={{ color: '#919191' }}
      component="p"
      fontSize="80%"
      fontWeight="bold"
    >
      {natDexNum}
    </Typography>
    <Typography
      gutterBottom
      variant="h5"
      component="h2"
      sx={{ textTransform: 'capitalize' }}
    >
      {pokemonName}
    </Typography>
    <Stack direction="row" spacing={1}>
      {pokemonTypes}
    </Stack>
  </CardContent>
);
