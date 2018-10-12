# Foxycle API

## Getting started

In the `./server` directory, run:

```shell
# Install dependencies
npm install

# Start development server
npm start
```

## Deploying `datamodel.prisma` changes

In the `./server/prisma` directory, run:

```shell
# Deploy changes
npx prisma deploy
```

You should see that files in the `./server/src/generated` directory have been updated.

## Helpful links

- [Prisma documentation](https://www.prisma.io/docs/)
- [Apollo Server documentation](https://www.apollographql.com/docs/apollo-server/)
