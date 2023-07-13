import { AppShell, MantineProvider } from '@mantine/core';
import React from 'react';
import { Header } from '../header';
import { Footer } from '../footer';
import { AppRouter } from '../../routes';
import { theme } from '../theme';
import { ErrorBoundary } from '../errorBoundary';
import '@fontsource/rubik';

export const App = () => (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <AppShell
          navbar={<Header />}
          footer={<Footer />}
        >
            <ErrorBoundary>
                <AppRouter />
            </ErrorBoundary>
        </AppShell>
    </MantineProvider>
);
