/**
 * Created by Jan on 28.6.2016.
 */
import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import schema from './database/schema/schema';

process.env.GRAPHQL_PORT = 2020;

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP(({ nieco, daco }) =>
  ({
    schema,
    context: {
      something: 'something' // je tu kvoli polu 'viewer', toto pole musi nieco vratit
    },                        // inak by vratilo null pre vsetky svoje dalsie polia
    graphiql: true,
    rootValue: { nieco, daco }
  })
));


app.listen(process.env.GRAPHQL_PORT, () => {
  console.log(`Server listen onn port ${process.env.GRAPHQL_PORT}`);
});
