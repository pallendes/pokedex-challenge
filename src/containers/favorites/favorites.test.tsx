import { Favorites } from '.';
import { render, screen, within } from '@testing-library/react';
import * as favoritesService from '../../services/favorites';
import { Pokemon } from '../../__generated__/graphql';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('<Favorites />', () => {
  const user = userEvent.setup();

  const favoritePokemonsList: Array<Partial<Pokemon>> = [
    {
      id: 1,
      name: 'Pokemon 1',
      nat_dex_num: 3,
      types: [{ name: 'type 1' }, { name: 'type 2' }],
    },
    {
      id: 2,
      name: 'Pokemon 2',
      nat_dex_num: 24,
      types: [{ name: 'type 4' }, { name: 'type 5' }],
    },
  ];

  const spyGetAll = jest.spyOn(favoritesService, 'getAll');
  const spyRemove = jest.spyOn(favoritesService, 'remove');

  it('should render the list of favorites', () => {
    spyGetAll.mockReturnValue(favoritePokemonsList as Pokemon[]);

    render(<Favorites />, { wrapper: BrowserRouter });

    expect(screen.getByText('Pokemon 1')).toBeInTheDocument();
    expect(screen.getByText('#003')).toBeInTheDocument();
    expect(screen.getByText('type 1')).toBeInTheDocument();
    expect(screen.getByText('type 2')).toBeInTheDocument();

    expect(screen.getByText('Pokemon 2')).toBeInTheDocument();
    expect(screen.getByText('#024')).toBeInTheDocument();
    expect(screen.getByText('type 4')).toBeInTheDocument();
    expect(screen.getByText('type 5')).toBeInTheDocument();
  });

  it('should display a message when no favorite pokemons have been added', () => {
    spyGetAll.mockReturnValue([]);

    render(<Favorites />, { wrapper: BrowserRouter });

    expect(
      screen.getByText('No favorite pokemons added yet')
    ).toBeInTheDocument();
  });

  it('should remove a pokemon from favorites', async () => {
    spyGetAll.mockReturnValue(favoritePokemonsList as Pokemon[]);

    render(<Favorites />, { wrapper: BrowserRouter });

    const pokemonCard = await screen.findByTestId('favorite-card-1');
    await user.click(within(pokemonCard).getByTestId('StarIcon'));

    expect(spyRemove).toHaveBeenCalledTimes(1);
    expect(spyRemove).toHaveBeenCalledWith({
      id: 1,
      name: 'Pokemon 1',
      nat_dex_num: 3,
      types: [{ name: 'type 1' }, { name: 'type 2' }],
    });
  });
});
