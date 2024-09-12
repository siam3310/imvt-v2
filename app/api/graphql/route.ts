import { schema } from '@/graphql/schema/Schema'
import { createYoga } from 'graphql-yoga'

const { handleRequest } = createYoga({
  schema: schema,
  graphqlEndpoint: '/api/graphql',

  fetchAPI: { Response },
})

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
