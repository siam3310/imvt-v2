'use client'
import React from 'react'
import { ThemeProvider } from 'next-themes'
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from "@apollo/client"

export default function Provider({ children }: IChildren) {
  const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
    cache: new InMemoryCache(),
  })

  return (
    <ThemeProvider attribute='class' value={{ light: 'light', dark: 'dark' }}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </ThemeProvider>
  )
}
