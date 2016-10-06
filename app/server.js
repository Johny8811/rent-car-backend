/**
 * Created by Jan on 28.6.2016.
 */
import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import schema from './database/schema/schema';
import secret from '../config';

process.env.GRAPHQL_PORT = 3000;

const app = express();

app.use(cors());

function getToken(req, res, next) {
  if (req.headers.token) {
    try {
      const decode = jwt.verify(req.headers.token, secret);
      req.token = decode;
    } catch (err) {
      console.error(err);
    }
  }
  next();
}

app.use('/graphql', getToken, graphqlHTTP(({ token }) =>
  ({
    schema,
    context: { token },
    graphiql: true
  })
));

app.listen(process.env.GRAPHQL_PORT, () => {
  console.log(`Server listen onn port ${process.env.GRAPHQL_PORT}`);
});
