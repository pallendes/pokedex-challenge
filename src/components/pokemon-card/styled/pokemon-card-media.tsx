import { CardMedia } from '@mui/material';
import { ReactElement, ReactNode } from 'react';

interface PokemonCardMediaProps {
  children: ReactNode;
}

export const PokemonCardMedia = ({
  children,
}: PokemonCardMediaProps): ReactElement => (
  <CardMedia sx={{ bgcolor: 'whitesmoke', height: 240 }}>{children}</CardMedia>
);
