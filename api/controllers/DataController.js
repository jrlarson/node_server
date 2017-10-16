'use strict';
const request = require('superagent');
const API_URL = 'https://itunes.apple.com/search';

const REQ_TIMEOUT_ERR_MSG = {
  'error': true,
  'message': 'RequestTimeout'
};
const RES_TIMEOUT_ERR_MSG = {
  'error': true,
  'message': 'Response Timeout'
};

const handleSuccess = (resp) => {
  console.log(resp.body.text);
};

const handleFailure = (err) => {
  console.log('Handling Error\n' + err);
}

const callAPI = async (term) => {
  console.log('calling with term', term);
  const data = await request
      .get(API_URL)
      .accept('application/json')
      .timeout({
      response: 5000,  // Wait 5 seconds for the server to start sending,
      deadline: 60000, // but allow 1 minute for the file to finish loading.
      })
      .query({ entity: 'musicArtist' })
      .query({ limit: 25 })
      .query({ term: term });
  return data;
};

exports.get_data = async (req, res) => {
  const searchTerm = req.query.search;
  console.log(searchTerm);

  let replyData;
  try {
    replyData = await callAPI(searchTerm);
  }
  catch(err) {
    res.send({
        'error': true,
        'message': err
    });
     return;
  };
  console.log('reply data:\n', replyData.text);
  res.send(JSON.parse(replyData.text));
  
};
