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

app.use('/graphql', graphqlHTTP((req, res) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.setHeader('Access-Control-Allow-Origin', '*');
  return {
    schema,
    context: {
      something: 'something' // je tu kvoli polu 'viewer', toto pole musi nieco vratit
    },                        // inak by vratilo null pre vsetky svoje dalsie polia
    graphiql: true
  };
}));

app.use('/kkt', (req, res) => {
  res.send('hello kokot');
});

app.listen(process.env.GRAPHQL_PORT, () => {
  console.log(`Server listen on port ${process.env.GRAPHQL_PORT}`);
});
