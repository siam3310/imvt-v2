'use client';

import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ThemeProvider } from 'next-themes';

export default function Provider({ children }: IChildren) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`,
    cache: new InMemoryCache(),
  });

  return (
    <ThemeProvider attribute='class' value={{ light: 'light', dark: 'dark' }}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ThemeProvider>
  );
}
