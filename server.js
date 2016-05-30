import express from 'express'
import { MongoClient } from 'mongodb'
import Schema from './Schema'
import GraphQLHTTP from 'express-graphql'

let MONGO_URI = 'mongodb://garam:1234@ds017553.mlab.com:17553/garam';
let app = express()
app.set('port', (process.env.PORT || 5000));

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

    app.listen(app.get('port'), function() {
      console.log('Node app is running on port', app.get('port'));
    });


  }
)

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});
