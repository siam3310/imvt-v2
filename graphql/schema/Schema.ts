import { resolvers } from '@/graphql/schema/resolvers';
import { typeDefs } from '@/graphql/schema/typeDefs';
import SchemaBuilder from '@pothos/core';
import AddGraphQLPlugin from '@pothos/plugin-add-graphql';
import { createSchema } from 'graphql-yoga';

const builder = new SchemaBuilder({
  plugins: [AddGraphQLPlugin],
  add: {
    schema: createSchema({
      resolvers,
      typeDefs,
    }),
  },
});

export const schema = builder.toSchema();
