import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from '@mui/material';
import { CSSProperties, ReactElement, useState } from 'react';
import { POKEMON_TYPE_COLOR_MAP } from '../common/constants';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const pokemonTypes = [
  'Grass',
  'Poison',
  'Fire',
  'Water',
  'Flying',
  'Bug',
  'Normal',
  'Electric',
  'Ground',
  'Fairy',
  'Psychic',
  'Fighting',
  'Rock',
  'Ice',
  'Ghost',
  'Steel',
  'Dragon',
];

const getStyles = (
  name: string,
  pokemonType: readonly string[],
  theme: Theme
): CSSProperties => {
  return {
    fontWeight: !pokemonType.includes(name)
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
  };
};

interface TypeFilterProps {
  onAddFilter: (filters: string[]) => void;
}

export const TypeFilter = ({ onAddFilter }: TypeFilterProps): ReactElement => {
  const theme = useTheme();
  const [pokemonType, setPokemonType] = useState<string[]>([]);

  const handleTypeFilterSelection = (
    event: SelectChangeEvent<typeof pokemonType>
  ): void => {
    const {
      target: { value },
    } = event;
    const _pokemonType = typeof value === 'string' ? value.split(',') : value;

    setPokemonType(_pokemonType);
    onAddFilter(_pokemonType);
  };

  return (
    <FormControl sx={{ mb: 1, width: '100%' }}>
      <InputLabel id="type-filter-label" sx={{ bgcolor: 'white', pr: 0.5 }}>
        Filter by type
      </InputLabel>
      <Select
        labelId="type-filter-label"
        multiple
        fullWidth
        value={pokemonType}
        onChange={handleTypeFilterSelection}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                size="small"
                sx={{
                  background: POKEMON_TYPE_COLOR_MAP[value],
                  color: 'white',
                }}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {pokemonTypes.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, pokemonType, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
