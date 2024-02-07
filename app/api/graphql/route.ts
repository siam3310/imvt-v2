import { createYoga } from 'graphql-yoga'
import { schema } from "@/graphql/schema/Schema"
const { handleRequest } = createYoga({
  schema: schema,
  graphqlEndpoint: '/api/graphql',

  fetchAPI: { Response }
})

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }
