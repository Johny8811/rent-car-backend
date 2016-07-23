/**
 * Created by Jan on 28.6.2016.
 */
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './database/schema';

process.env.GRAPHQL_PORT = 2020;

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    context: {
        k: 3 // je tu kvoli polu "viewer", toto pole musi nieco vratit inak by vratilo null pre vsetky svoje dalsie polia
    },
    graphiql: true
}))

app.use('/kkt', (req,res) => {
    res.send("hello world");
});

app.listen(process.env.GRAPHQL_PORT, () => {
    console.log("server listen on port " + process.env.GRAPHQL_PORT);
});