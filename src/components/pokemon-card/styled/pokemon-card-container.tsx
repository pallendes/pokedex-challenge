import { Card } from '@mui/material';
import { ReactElement, ReactNode } from 'react';

interface PokemonCardContainerProps {
  children: ReactNode;
}

export const PokemonCardContainer = ({
  children,
}: PokemonCardContainerProps): ReactElement => (
  <Card
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      transition: 'all .2s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    }}
  >
    {children}
  </Card>
);
