'use strict';
const request = require('request-promise');
const API_URL = 'https://itunes.apple.com/search?entity=musicArtist&limit=25&term=';

const errorMessage = (status, message) => {
  return {
  'error': true,
  'statusCode': status,
  'message': 'The downstream service returned ' + message
  }
};

exports.get_data = async (req, res) => {

  const searchTerm = req.query.search;
  var options = {
    uri: API_URL + searchTerm,
    method: 'GET',
    simple: true,
    resolveWithFullResponse: true,
    headers: {
        'Accept': 'application/json'
    },
    json: true // Automatically parses the JSON string in the response
  };

  const rq = await request(options).then( function ( response ) {
     res.json( response.body );
  })
  .catch(  function (err) {
    res.json( errorMessage(err.statusCode, err.message) );
  });

};
  