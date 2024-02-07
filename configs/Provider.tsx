'use client'
import React from 'react'
import { ThemeProvider } from 'next-themes'
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from "@apollo/client"

export default function Provider({ children }: IChildren) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`,
    cache: new InMemoryCache(),
  })

  return (
    <ThemeProvider attribute='class' value={{ light: 'light', dark: 'dark', green: 'green', blue: 'blue', red: 'red', yellow: 'yellow', purple: 'purple' }}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </ThemeProvider>
  )
}
