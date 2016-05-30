import express from 'express'
import { MongoClient } from 'mongodb'
import Schema from './Schema'
import GraphQLHTTP from 'express-graphql'

let app = express()
let MONGO_URI = 'mongodb://garam:1234@ds017553.mlab.com:17553/garam';

let db;

MongoClient.connect(
  MONGO_URI,
  (err,database) => {
    if(err) throw err;

    db = database;
    app.use('/graphql',GraphQLHTTP({
      schema : Schema(db),
      graphiql:true
    }))
    app.listen(3000, () => console.log("Listening on port 3000"));

  }
)

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});
