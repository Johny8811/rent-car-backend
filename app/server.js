/**
 * Created by Jan on 28.6.2016.
 */
import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import schema from './database/schema/schema';

import jwt from 'jsonwebtoken';
import secret from '../config';

process.env.GRAPHQL_PORT = 2020;

const app = express();

app.use(cors());

function getToken(req, res, next) {
  if (req.headers.token) {
    try {
      let decode = jwt.verify(req.headers.token, secret);
      req.token = decode;
    } catch (err) {
      console.log(err);
    }
  }
  next();
}

app.use('/graphql', getToken, graphqlHTTP(({ token }) =>
  ({
    schema,
    context: {
      something: 'something' // je tu kvoli polu 'viewer', toto pole musi nieco vratit
    },                        // inak by vratilo null pre vsetky svoje dalsie polia
    graphiql: true,
    rootValue: { token }
  })
));

app.listen(process.env.GRAPHQL_PORT, () => {
  console.log(`Server listen onn port ${process.env.GRAPHQL_PORT}`);
});
