const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const app = express();
const routes = require( './api/routes/DataRoute' ); // importing route
const port = process.env.PORT || 3001;

app.use( bodyParser.urlencoded( { 'extended': true } ) );
app.use( bodyParser.json() );

routes( app ); // register the route
app.listen( port );

console.log( `RESTful API server started on: ${ port}` );
