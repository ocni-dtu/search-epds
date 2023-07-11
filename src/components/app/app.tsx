import { AppShell, MantineProvider } from '@mantine/core';
import React from 'react';
import { Header } from '../header';
import { Footer } from '../footer';
import { AppRouter } from '../../routes';
import { CustomFonts, theme } from '../theme';
import { ErrorBoundary } from '../errorBoundary';

export const App = () => (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <AppShell
          style={{ minHeight: '80%' }}
          navbar={<Header />}
          footer={<Footer />}
        >
            <ErrorBoundary>
                <CustomFonts />
                <AppRouter />
            </ErrorBoundary>
        </AppShell>
    </MantineProvider>
);
