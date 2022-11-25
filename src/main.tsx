import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { client } from './apollo-client';
import { Favorites } from './containers/favorites';
import { Home } from './containers/home';

import '@fontsource/exo-2/300.css';
import '@fontsource/exo-2/400.css';
import '@fontsource/exo-2/500.css';
import '@fontsource/exo-2/700.css';

const theme = createTheme({
  typography: {
    fontFamily: ['"Exo 2"', 'sans-serif'].join(','),
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/favorites',
    element: <Favorites />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);
