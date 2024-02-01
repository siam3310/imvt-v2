import { createSchema } from 'graphql-yoga'
import { typeDefs } from '@/graphql/schema/typeDefs'
import { resolvers } from '@/graphql/schema/resolvers'
import SchemaBuilder from '@pothos/core';
import AddGraphQLPlugin from '@pothos/plugin-add-graphql';

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