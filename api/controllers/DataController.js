'use strict';
const Client = require('node-rest-client').Client;
const API_URL = 'https://itunes.apple.com/search';
const REQ_TIMEOUT_ERR_MSG = {
  'error': true,
  'message': 'RequestTimeout'
};
const RES_TIMEOUT_ERR_MSG = {
  'error': true,
  'message': 'Response Timeout'
};

exports.get_data = function (req, res) {
  const client = new Client();
  const searchTerm = req.query.search;
  console.log(searchTerm);

  const args = {
    parameters: { entity: 'musicArtist',
      limit: 25,
      term: searchTerm
    }, 
    requestConfig: {
      timeout: 1000, //request timeout in milliseconds 
    },
    responseConfig: {
      timeout: 1000 //response timeout 
    }
  };
     
  req = client.get(API_URL, args,
    // eslint-disable-next-line no-unused-vars
    function (data, response) {
      res.json(JSON.parse(data));
    });
    
  req.on('error', function (err) {
    console.log('request error', err);
    res.json(err.message);
  });

  req.on('requestTimeout', function (req) {
    console.log('request has expired');
    req.abort();
    res.json(REQ_TIMEOUT_ERR_MSG);
  });

  req.on('responseTimeout', function (res) {
    console.log('response has expired');
    res.json(RES_TIMEOUT_ERR_MSG);
    
  });
};