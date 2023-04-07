import { AppShell, MantineProvider } from '@mantine/core';
import React from 'react';
import { Header } from '../header';
import { Footer } from '../footer';
import { AppRouter } from '../../routes';

export const App = () => (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <AppShell
              style={{ minHeight: '100%' }}
              navbar={<Header />}
              footer={<Footer />}
            >
                <AppRouter />
            </AppShell>
        </MantineProvider>
    );
