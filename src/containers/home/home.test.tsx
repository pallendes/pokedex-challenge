import { ApolloProvider } from '@apollo/client';
import { render, screen, waitFor, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home } from '.';
import { client } from '../../apollo-client';
import userEvent from '@testing-library/user-event';

describe('<Home />', () => {
  const user = userEvent.setup();

  it('should display the list of pokemons retrieved from the endpoint', async () => {
    render(
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>,
      { wrapper: BrowserRouter }
    );

    expect(await screen.findByText('bulbasaur')).toBeInTheDocument();
    expect(await screen.findByText('ivysaur')).toBeInTheDocument();
    expect(await screen.findByText('venusaur')).toBeInTheDocument();
    expect(await screen.findByText('charmander')).toBeInTheDocument();
    expect(await screen.findByText('charmeleon')).toBeInTheDocument();
  });

  it('should sort the pokemon cards in alphabetical order asc', async () => {
    render(
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>,
      { wrapper: BrowserRouter }
    );

    await user.click(await screen.findByRole('button', { name: 'Sort by' }));
    await user.click(screen.getByText('A-Z'));

    const pokemonCards = screen.getAllByTestId(/pokemon-card-/);

    expect(within(pokemonCards[0]).getByText('bulbasaur')).toBeInTheDocument();
    expect(within(pokemonCards[1]).getByText('charmander')).toBeInTheDocument();
    expect(within(pokemonCards[2]).getByText('charmeleon')).toBeInTheDocument();
    expect(within(pokemonCards[3]).getByText('ivysaur')).toBeInTheDocument();
    expect(within(pokemonCards[4]).getByText('venusaur')).toBeInTheDocument();
  });

  it('should sort the pokemon cards in alphabetical order desc', async () => {
    render(
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>,
      { wrapper: BrowserRouter }
    );

    await user.click(await screen.findByRole('button', { name: 'Sort by' }));
    await user.click(screen.getByText('Z-A'));

    const pokemonCards = screen.getAllByTestId(/pokemon-card-/);

    expect(within(pokemonCards[0]).getByText('venusaur')).toBeInTheDocument();
    expect(within(pokemonCards[1]).getByText('ivysaur')).toBeInTheDocument();
    expect(within(pokemonCards[2]).getByText('charmeleon')).toBeInTheDocument();
    expect(within(pokemonCards[3]).getByText('charmander')).toBeInTheDocument();
    expect(within(pokemonCards[4]).getByText('bulbasaur')).toBeInTheDocument();
  });

  it('should restore default order of the pokemon cards', async () => {
    render(
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>,
      { wrapper: BrowserRouter }
    );

    await user.click(await screen.findByRole('button', { name: 'Sort by' }));
    await user.click(screen.getByText('Z-A'));
    await user.click(await screen.findByRole('button', { name: 'Sort by' }));
    await user.click(screen.getByText('National Dex Number (Default)'));

    const pokemonCards = screen.getAllByTestId(/pokemon-card-/);

    expect(within(pokemonCards[0]).getByText('bulbasaur')).toBeInTheDocument();
    expect(within(pokemonCards[1]).getByText('ivysaur')).toBeInTheDocument();
    expect(within(pokemonCards[2]).getByText('venusaur')).toBeInTheDocument();
    expect(within(pokemonCards[3]).getByText('charmander')).toBeInTheDocument();
    expect(within(pokemonCards[4]).getByText('charmeleon')).toBeInTheDocument();
  });

  it('should filter the results by the pokemon name', async () => {
    render(
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>,
      { wrapper: BrowserRouter }
    );

    await user.type(
      await screen.findByRole('textbox', { name: 'Search' }),
      'bulbas'
    );

    await waitFor(() =>
      expect(screen.queryByText('charmander')).not.toBeInTheDocument()
    );

    const pokemonCards = screen.getAllByTestId(/pokemon-card-/);

    expect(pokemonCards).toHaveLength(1);
    expect(within(pokemonCards[0]).getByText('bulbasaur')).toBeInTheDocument();
  });

  it('should filter pokemons by type', async () => {
    render(
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>,
      { wrapper: BrowserRouter }
    );

    await user.click(
      await screen.findByRole('button', { name: 'Filter by type' })
    );
    await user.click(screen.getByRole('option', { name: 'Fire' }));

    const pokemonCards = screen.getAllByTestId(/pokemon-card-/);

    expect(pokemonCards).toHaveLength(2);
    expect(within(pokemonCards[0]).getByText('charmander')).toBeInTheDocument();
    expect(within(pokemonCards[1]).getByText('charmeleon')).toBeInTheDocument();
  });

  it('shoudl mark a pokemon as favorite', async () => {
    render(
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>,
      { wrapper: BrowserRouter }
    );

    const bulbasaurCard = await screen.findByTestId('pokemon-card-0');
    await user.click(within(bulbasaurCard).getByTestId('StarBorderIcon'));

    expect(within(bulbasaurCard).getByTestId('StarIcon')).toBeInTheDocument();
  });
});
