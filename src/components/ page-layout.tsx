import { Container } from '@mui/system';
import { ReactElement, ReactNode } from 'react';
import { AppBar } from './app-bar';

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps): ReactElement => (
  <>
    <AppBar />
    <Container maxWidth="lg" sx={{ py: 5 }} component="main">
      {children}
    </Container>
  </>
);
